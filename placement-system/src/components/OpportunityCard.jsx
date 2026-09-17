export default function OpportunityCard({ job }) {
  return (
    <div className="job-card">
      <h4>{job.company} — {job.role}</h4>
      <p>Package: {job.package} | Location: {job.location}</p>
      <p>Eligibility: {job.eligibility}</p>
      <p>Skills: {job.skills.join(", ")}</p>
      <p>Deadline: {job.deadline}</p>
    </div>
  );
}