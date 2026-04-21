import { Link, useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  const handleApplyClick = (e) => {
    const user = localStorage.getItem("user"); // Check if user is in localStorage
    if (!user) {
      e.preventDefault(); // Stop the link from opening
      alert("Please Log In or Sign Up to apply for jobs!");
      navigate("/Login");
    }
  };

  return (
    <div className="bg-white border-2 border-[#fff3e5] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <span className="text-[10px] uppercase tracking-widest bg-[#fff3e5] text-[#f79323] font-bold px-3 py-1 rounded-full">
          {job.source || "Remote"}
        </span>
        <h2 className="text-xl font-bold text-gray-800 mt-4 leading-tight">{job.title}</h2>
        <p className="text-[#f79323] font-semibold mt-1 italic">{job.company}</p>
        <p className="text-sm text-gray-500 mt-3">{job.location}</p>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <Link to={`/job/${job._id}`} className="text-sm font-bold text-gray-400 hover:text-black transition">
          View Details
        </Link>
        <a 
          href={job.applyLink} 
          target="_blank" 
          rel="noreferrer"
          onClick={handleApplyClick}
          className="flex-grow text-center bg-black text-white text-sm font-bold py-3 rounded-xl hover:bg-[#f79323] transition-colors shadow-md"
        >
          Quick Apply
        </a>
      </div>
    </div>
  );
}

export default JobCard;