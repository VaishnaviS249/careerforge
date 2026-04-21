import React, { useState } from "react";
import axios from "axios";
import bgImage from "../assets/contact.webp";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      if (res.status === 201) {
        setStatus("Thank you! Your request has been submitted.");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("Failed to send message. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dc6b43] py-10 flex items-center justify-center">
      <div className="bg-white flex flex-col lg:flex-row min-h-[500px] rounded-2xl overflow-hidden shadow-2xl max-w-5xl w-full mx-4">
        {/* Image Section */}
        <div className="lg:w-1/2 relative hidden lg:block">
          <img src={bgImage} alt="Support" className="w-full h-full object-cover" />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="lg:w-1/2 flex flex-col justify-center px-8 py-10 bg-white">
          <h1 className="text-[#e34c38] text-3xl font-bold mb-1 tracking-tight">Need support?</h1>
          <p className="text-gray-400 text-md mb-6">Contact us if you need further assistance.</p>

          {status && (
            <div className={`mb-4 p-3 rounded text-sm font-bold ${status.includes("Thank you") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {status}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Name and Surname</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e34c38]/20 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e34c38]/20 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Message Details</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-gray-100 rounded-md px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-[#e34c38]/20 transition-all"
                placeholder="How can we help you?"
              />
            </div>

            <div className="flex justify-end mt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#b81e17] hover:bg-[#e34c38] text-white text-sm font-bold px-10 py-3 rounded-full shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? "SENDING..." : "SUBMIT"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;