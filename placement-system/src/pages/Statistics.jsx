import { stats, companyWise } from "../data/statsData";

export default function Statistics() {
  return (
    <div>
      <h2>Placement Statistics</h2>
      <div className="stats-grid">
        <div className="stat-box"><p>Total Companies</p><h3>{stats.totalCompanies}</h3></div>
        <div className="stat-box"><p>Total Opportunities</p><h3>{stats.totalOpportunities}</h3></div>
        <div className="stat-box"><p>Students Placed</p><h3>{stats.studentsPlaced}</h3></div>
        <div className="stat-box"><p>Placement %</p><h3>{stats.placementPercentage}%</h3></div>
        <div className="stat-box"><p>Highest Package</p><h3>{stats.highestPackage}</h3></div>
        <div className="stat-box"><p>Average Package</p><h3>{stats.averagePackage}</h3></div>
      </div>

      <h3>Company-wise Placements</h3>
      <table>
        <thead><tr><th>Company</th><th>Students Placed</th></tr></thead>
        <tbody>
          {companyWise.map((c, i) => (
            <tr key={i}><td>{c.company}</td><td>{c.placed}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}