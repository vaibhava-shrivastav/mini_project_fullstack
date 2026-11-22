import { useState } from "react";
import { useData } from "../context/DataContext";
import OpportunityCard from "../components/OpportunityCard";
import "./Opportunities.css";

export default function Opportunities() {
  const { drives } = useData();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("none");

  const locations = ["All", ...new Set(drives.map((d) => d.location))];

  let filtered = drives.filter(
    (job) =>
      (job.role + job.company + job.skills.join(" ")).toLowerCase().includes(search.toLowerCase()) &&
      (location === "All" || job.location === location)
  );

  if (sort === "deadline") {
    filtered = [...filtered].sort((a, b) => a.deadline.localeCompare(b.deadline));
  }

  return (
    <div>
      <h2>Placement Opportunities</h2>
      <div className="filter-row">
        <input type="text" placeholder="Search by company, role or skill" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          {locations.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">Sort: Default</option>
          <option value="deadline">Sort: Nearest Deadline</option>
        </select>
      </div>
      {filtered.length === 0 && <p className="empty">No matching drives found.</p>}
      <div className="job-grid">
        {filtered.map((job) => <OpportunityCard key={job.id} job={job} />)}
      </div>
    </div>
  );
}