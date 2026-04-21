function Filters() {
  return (
    <div className="p-4 border-r w-60">
      <h2 className="font-bold mb-3">Filters</h2>

      <div className="mb-4">
        <label>Job Type</label>
        <select className="border p-2 w-full">
          <option>Internship</option>
          <option>Full Time</option>
          <option>Remote</option>
        </select>
      </div>

      <div>
        <label>Experience</label>
        <select className="border p-2 w-full">
          <option>Entry</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
