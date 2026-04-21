import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs?q=${search}&page=${pageNumber}`);
      setJobs(res.data.jobs || []); 
      setTotalPages(res.data.totalPages || 1);
      setPage(res.data.currentPage || 1);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf6ed] py-10 px-8 lg:px-20">
      
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Opportunities</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search by role, company, or skills..."
            className="border-2 border-gray-200 p-4 rounded-xl flex-grow outline-none focus:border-[#f79323] transition-colors text-lg"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchJobs(1)}
          />
          <button 
            onClick={() => fetchJobs(1)} 
            className="bg-[#f79323] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#e6821d] transition-colors shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="text-center py-20 text-xl font-bold text-gray-400">Loading jobs...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center py-10 text-xl">No jobs found matching your search.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-16 pb-10">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => fetchJobs(index + 1)}
                  className={`w-12 h-12 rounded-xl font-bold transition-all text-lg ${
                    page === index + 1 
                    ? 'bg-[#f79323] text-white shadow-lg transform -translate-y-1' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#f79323] hover:text-[#f79323]'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Jobs;