
import { useData } from "../context/DataContext";
import TrackerBar from "../components/TrackerBar";

export default function Tracking() {
  const { applications } = useData();

  return (
    <div>
      <h2>Application Tracking</h2>

      {applications.length === 0 && (
        <p className="empty">
          No applications yet. Apply from Opportunities.
        </p>
      )}

      {applications.map((app) => (
        <div key={app.driveId} className="panel">
          <h4>
            {app.company} — {app.role}
          </h4>

          <TrackerBar stage={app.stage} />
        </div>
      ))}
    </div>
  );
}
