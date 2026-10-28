
import { student, stages } from "../data/studentData";
import { useData } from "../context/DataContext";
import StatusCard from "../components/StatusCard";

export default function Dashboard() {
  const { applications, drives } = useData();

  const shortlisted = applications.filter(
    (a) => a.stage === 2
  ).length;

  return (
    <div>
      <h2>Welcome, {student.name}</h2>

      <p className="muted">
        Roll No: {student.rollNo} | Branch: {student.branch} | CGPA: {student.cgpa}
      </p>

      <div className="status-grid">
        <StatusCard title="Open Drives" value={drives.length} />
        <StatusCard title="Applications" value={applications.length} />
        <StatusCard title="Shortlisted" value={shortlisted} />
        <StatusCard title="Skills" value={student.skills.join(", ")} />
      </div>

      <div className="panel">
        <h3>Application Status</h3>

        {applications.length === 0 && (
          <p className="empty">
            You haven't applied to any drive yet.
          </p>
        )}

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((a) => (
              <tr key={a.driveId}>
                <td>{a.company}</td>
                <td>{a.role}</td>
                <td>
                  <span className="badge">{stages[a.stage]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
