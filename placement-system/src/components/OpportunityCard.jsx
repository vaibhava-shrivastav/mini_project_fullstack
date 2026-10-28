import { useData } from "../context/DataContext";

export default function OpportunityCard({ job }) {
  const { applications, applyToDrive } = useData();
  const applied = applications.some((a) => a.driveId === job.id);

  return (
    <div className="job-card">
      <div className="job-head">
        <h4>{job.company}</h4>
        <span className="badge">{job.package}</span>
      </div>
      <p className="job-role">{job.role} · {job.location}</p>
      <p><strong>Eligibility:</strong> {job.eligibility}</p>
      <div className="skill-tags">
        {job.skills.map((s) => <span key={s} className="tag">{s}</span>)}
      </div>
      <div className="job-foot">
        <small>Deadline: {job.deadline}</small>
        <button className="btn" disabled={applied} onClick={() => applyToDrive(job)}>
          {applied ? "Applied ✓" : "Apply"}
        </button>
      </div>
    </div>
  );
}