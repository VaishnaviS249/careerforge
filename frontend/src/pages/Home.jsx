import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/Job_Hunt.webp";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate('/jobs', { state: { searchQuery: search } });
    } else {
      navigate('/jobs');
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-[#dc6b43] overflow-hidden min-h-[90vh]">
      
      {/* Top Content Section */}
      <section className="flex flex-col items-center pt-8 z-10 px-4 relative">
        
        {/* Status Pill */}
        <div className="text-sm rounded-full bg-white text-[#dc6b43] font-bold px-6 py-2 mb-8 shadow-sm">
          • 12,400+ new jobs this week
        </div>

        {/* Hero Title */}
        {/* Changing md:text-8xl to md:text-7xl for a slightly smaller look */}
        <h1 className="flex flex-col text-5xl md:text-7xl font-bold font-['Fraunces'] text-center leading-[1.05] tracking-tight mb-8"> 
          <span className="text-black">Find Your</span>
          <span className="text-white italic">Dream</span>
          <span className="text-black">Job Today.</span>
        </h1>

        {/* Action Button (Since you want the clean look from the screenshot) */}
        <Link 
          to="/jobs" 
          className="bg-black text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all shadow-lg z-20"
        >
          Explore Jobs Now
        </Link>
        
        {/* OR: If you want the search bar instead, uncomment this block and delete the Link above */}
        {/* <div className="flex w-full max-w-2xl bg-white rounded-full shadow-xl overflow-hidden p-2 z-20">
          <input 
            type="text" placeholder="Search jobs..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow px-6 py-2 text-lg outline-none bg-transparent placeholder-gray-400"
          />
          <button onClick={handleSearch} className="bg-black text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-800">
            Search
          </button>
        </div> 
        */}

      </section>

      {/* Bottom Illustration Section */}
     {/* Bottom Illustration Section */}
      {/* Increased negative top margin (-mt-64) pulls the whole image up */}
       <div className="w-full flex-grow relative -mt-64 z-0 pointer-events-none">
        <img
         src={bgImage}
         alt="Hero Illustration"
        className="absolute inset-0 w-full h-full object-cover object-[50%_-29%]"
        />
      </div>

    </div>
  );
}

export default Home;