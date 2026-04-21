import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/LoginComp.webp";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      
      // Save user data and token
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Login Successful!");
      navigate("/"); // Go to home page
      window.location.reload(); // Refresh to update Navbar
    } catch (err) {
      alert(err.response?.data || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="flex h-screen bg-[#ed6e4e]">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <img src={bgImage} alt="Logo" className="h-full w-full object-cover" />
      </div>

      <div className="w-1/2 flex flex-col justify-center px-16 ml-10">
        <h2 className="text-4xl font-bold text-white mb-3">LOGIN</h2>
        <p className="text-white text-lg mb-8">Enter your account details</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="bg-transparent border-b border-[#e3bfb2] text-white placeholder-white/70 p-2 w-full mb-6 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="bg-transparent border-b border-[#e3bfb2] text-white placeholder-white/70 p-2 w-full mb-6 outline-none"
          />

          <div className="flex items-center justify-between text-white text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" />
              <span>Remember Me</span>
            </label>
            <div className="hover:underline cursor-pointer">Forgot Password?</div>
          </div>

          <button 
            type="submit"
            className="bg-[#6978bb] w-full mt-12 hover:bg-[#323464] text-white py-3 rounded-full text-xl font-medium transition-colors"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="text-white">Don't have an account?</span>
          <Link to="/Signup" className="text-white font-bold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;