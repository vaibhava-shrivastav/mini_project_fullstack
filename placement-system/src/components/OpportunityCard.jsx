import { useData } from "../context/DataContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { student } from "../data/studentData";

export default function OpportunityCard({ job }) {
  const { applications, applyToDrive } = useData();
  const [profile] = useLocalStorage("profile", student);

  const applied = applications.some((a) => a.driveId === job.id);
  const expired = new Date(job.deadline) < new Date();
  const match = job.eligibility.match(/CGPA\s*>=\s*([\d.]+)/i);
  const eligible = match ? Number(profile.cgpa) >= Number(match[1]) : true;

  let label = "Apply";
  if (applied) label = "Applied ✓";
  else if (expired) label = "Closed";
  else if (!eligible) label = "Not Eligible";

  return (
    <div className="job-card">
      <div className="job-head">
        <h4>{job.company}</h4>
        <span className="badge">{job.package}</span>
      </div>
      <p className="job-role">{job.role} · {job.location}</p>
      <p><strong>Eligibility:</strong> {job.eligibility}</p>
      <p className={eligible ? "elig-yes" : "elig-no"}>
        {eligible ? "You are eligible" : "You do not meet the criteria"}
      </p>
      <div className="skill-tags">
        {job.skills.map((s) => <span key={s} className="tag">{s}</span>)}
      </div>
      <div className="job-foot">
        <small>Deadline: {job.deadline}</small>
        <button className="btn" disabled={applied || expired || !eligible} onClick={() => applyToDrive(job)}>
          {label}
        </button>
      </div>
    </div>
  );
}