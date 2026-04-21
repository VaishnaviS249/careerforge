import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload(); 
  };

  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-transparent relative z-20">
      {/* Brand Logo */}
      <h1 className="text-2xl font-bold font-['Fraunces']">
        <span className="text-black">Career</span>
        <span className="text-white">Forge</span>
      </h1>

      {/* Nav Links - Removed Jobs */}
      <div className="hidden md:flex gap-8 font-medium text-white text-sm">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <Link to="/companies" className="hover:text-black transition-colors">Companies</Link>
        <Link to="/about" className="hover:text-black transition-colors">About Us</Link>
        <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-4 text-white text-sm">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">Logged in as</span>
              <span className="font-bold">{user.user.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/Login" className="hover:text-black transition-colors font-medium">Login</Link>
            <Link 
              to="/Signup" 
              className="rounded-full px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-[#dc6b43] transition-colors font-medium"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;