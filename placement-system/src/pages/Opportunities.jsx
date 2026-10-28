import { useState } from "react";
import { useData } from "../context/DataContext";
import OpportunityCard from "../components/OpportunityCard";

export default function Opportunities() {
  const { drives } = useData();
  const [search, setSearch] = useState("");

  const filtered = drives.filter((job) =>
    (job.role + job.company + job.skills.join(" ")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Placement Opportunities</h2>
      <input
        type="text"
        placeholder="Search by company, role or skill"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length === 0 && <p className="empty">No matching drives found.</p>}
      <div className="job-grid">
        {filtered.map((job) => <OpportunityCard key={job.id} job={job} />)}
      </div>
    </div>
  );
}