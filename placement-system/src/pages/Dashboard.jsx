import { student, applications } from "../data/studentData";
import StatusCard from "../components/StatusCard";

export default function Dashboard() {
  const shortlisted = applications.filter(
    a => a.status === "Shortlisted"
  ).length;

  return (
    <div>
      <h2>Welcome, {student.name}</h2>

      <p>
        Roll No: {student.rollNo} | Branch: {student.branch} | CGPA: {student.cgpa}
      </p>

      <div className="status-grid">
        <StatusCard
          title="Total Applications"
          value={applications.length}
        />

        <StatusCard
          title="Shortlisted"
          value={shortlisted}
        />

        <StatusCard
          title="Skills"
          value={student.skills.join(", ")}
        />
      </div>

      <h3>Application Status</h3>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app, i) => (
            <tr key={i}>
              <td>{app.company}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}