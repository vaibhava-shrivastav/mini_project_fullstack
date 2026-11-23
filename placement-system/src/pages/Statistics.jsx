import { useData } from "../context/DataContext";
import { stats, companyWise } from "../data/statsData";
import "./Statistics.css";

export default function Statistics() {
  const { drives, applications } = useData();

  const totalCompanies = new Set(drives.map((d) => d.company)).size;
  const shortlisted = applications.filter((a) => a.stage >= 2).length;
  const selected = applications.filter((a) => a.stage === 4).length;
  const max = Math.max(...companyWise.map((c) => c.placed));

  const live = [
    ["Total Companies", totalCompanies],
    ["Open Drives", drives.length],
    ["Applications", applications.length],
    ["Shortlisted", shortlisted],
    ["Selected", selected],
  ];

  const past = [
    ["Students Placed", stats.studentsPlaced],
    ["Placement %", stats.placementPercentage + "%"],
    ["Highest Package", stats.highestPackage],
    ["Average Package", stats.averagePackage],
  ];

  return (
    <div>
      <h2>Placement Statistics</h2>

      <h3>Current Drive Activity (live)</h3>
      <div className="stats-grid">
        {live.map(([label, value]) => (
          <div className="stat-box" key={label}><p>{label}</p><h3>{value}</h3></div>
        ))}
      </div>

      <h3>Last Year Placement Summary</h3>
      <div className="stats-grid">
        {past.map(([label, value]) => (
          <div className="stat-box" key={label}><p>{label}</p><h3>{value}</h3></div>
        ))}
      </div>

      <div className="panel">
        <h3>Company-wise Placements</h3>
        {companyWise.map((c) => (
          <div className="bar-row" key={c.company}>
            <span className="bar-label">{c.company}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${(c.placed / max) * 100}%` }} />
            </div>
            <span className="bar-value">{c.placed}</span>
          </div>
        ))}
      </div>
    </div>
  );
}