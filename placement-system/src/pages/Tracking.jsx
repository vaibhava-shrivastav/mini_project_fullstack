import { applications } from "../data/studentData";
import TrackerBar from "../components/TrackerBar";

export default function Tracking() {
  return (
    <div>
      <h2>Application Tracking</h2>
      {applications.map((app, i) => (
        <div key={i} className="tracker-item">
          <h4>{app.company}</h4>
          <TrackerBar stage={app.stage} />
        </div>
      ))}
    </div>
  );
}