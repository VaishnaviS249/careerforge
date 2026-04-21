import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";

function Dashboard() {
  const jobs = [];

  return (
    <div>
      <Navbar />

      <div className="flex">
        <Filters />

        <div className="grid grid-cols-2 gap-6 p-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
