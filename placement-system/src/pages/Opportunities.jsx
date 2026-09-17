import { useState } from "react";
import { opportunities } from "../data/opportunitiesData";
import OpportunityCard from "../components/OpportunityCard";

export default function Opportunities() {
  const [search, setSearch] = useState("");

  const filtered = opportunities.filter(
    (job) =>
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Placement Opportunities</h2>

      <input
        type="text"
        placeholder="Search by company or role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="job-list">
        {filtered.map((job, i) => (
          <OpportunityCard key={i} job={job} />
        ))}
      </div>
    </div>
  );
}