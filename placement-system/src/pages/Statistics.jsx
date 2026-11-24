import { useState } from "react";
import { useData } from "../context/DataContext";
import {
  stats,
  companyWise,
  salaryDistribution,
  branchWise,
  yearlyComparison,
} from "../data/statsData";
import "./Statistics.css";

export default function Statistics() {
  const { drives, applications } = useData();
  const [selectedSeason, setSelectedSeason] = useState("current");
  const [activeTab, setActiveTab] = useState("overview");

  // Live real-time calculations from DataContext
  const totalLiveCompanies = new Set(drives.map((d) => d.company)).size || stats.totalCompanies;
  const liveOpenDrives = drives.length || stats.totalOpportunities;
  const liveApplicationsCount = applications.length;
  const liveShortlisted = applications.filter((a) => a.stage >= 2).length;
  const liveSelected = applications.filter((a) => a.stage === 4).length;

  const maxPlacedCompany = Math.max(...companyWise.map((c) => c.placed));
  const maxSalaryCount = Math.max(...salaryDistribution.map((s) => s.count));

  // Circular gauge calculations for 77.3% placement rate
  const rate = stats.placementPercentage;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (rate / 100) * circumference;

  return (
    <div className="stats-container">
      {/* Page Header */}
      <div className="stats-header">
        <div>
          <h2>Placement Analytics & Visual Statistics</h2>
          <p className="muted">
            Comprehensive insights into recruitment trends, packages, and department outcomes.
          </p>
        </div>

        <div className="stats-season-toggle">
          <button
            type="button"
            className={`season-btn ${selectedSeason === "current" ? "active" : ""}`}
            onClick={() => setSelectedSeason("current")}
          >
            2025–26 (Live Season)
          </button>
          <button
            type="button"
            className={`season-btn ${selectedSeason === "historical" ? "active" : ""}`}
            onClick={() => setSelectedSeason("historical")}
          >
            Historical Comparison
          </button>
        </div>
      </div>

      {/* Top Highlight KPI Cards */}
      <div className="kpi-grid">
        {/* KPI 1: Placement Rate Circular Donut Meter */}
        <div className="kpi-card gauge-card">
          <div className="gauge-wrapper">
            <svg className="gauge-svg" viewBox="0 0 110 110">
              <circle
                className="gauge-bg-circle"
                cx="55"
                cy="55"
                r="45"
              />
              <circle
                className="gauge-progress-circle"
                cx="55"
                cy="55"
                r="45"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              />
            </svg>
            <div className="gauge-text">
              <span className="gauge-number">{rate}%</span>
              <span className="gauge-sub">Placed</span>
            </div>
          </div>
          <div className="gauge-info">
            <h4>Placement Rate</h4>
            <p className="muted">{stats.studentsPlaced} of {stats.totalEligible} Students Placed</p>
            <span className="trend-badge positive">↑ +5.3% vs Last Year</span>
          </div>
        </div>

        {/* KPI 2: Highest Package */}
        <div className="kpi-card highlight-card">
          <div className="kpi-top">
            <span className="kpi-label">Highest Package</span>
            <span className="kpi-icon">🏆</span>
          </div>
          <div className="kpi-value">{stats.highestPackage}</div>
          <p className="kpi-sub">Top Offer: Amazon (Software Dev Engineer)</p>
          <span className="trend-badge positive">↑ New Campus Record</span>
        </div>

        {/* KPI 3: Average Package */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Average CTC</span>
            <span className="kpi-icon">📈</span>
          </div>
          <div className="kpi-value">{stats.averagePackage}</div>
          <p className="kpi-sub">Median CTC: {stats.medianPackage}</p>
          <span className="trend-badge positive">↑ +14.2% Growth</span>
        </div>

        {/* KPI 4: Total Drives */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Recruiting Companies</span>
            <span className="kpi-icon">🏢</span>
          </div>
          <div className="kpi-value">{totalLiveCompanies}</div>
          <p className="kpi-sub">{liveOpenDrives} Total Placement Drives</p>
          <span className="trend-badge neutral">12 On-Campus • 12 Virtual</span>
        </div>
      </div>

      {/* Live Application Pipeline / Funnel */}
      <div className="panel funnel-panel">
        <div className="panel-header-row">
          <div>
            <h3>Live Application Funnel (Current Season)</h3>
            <p className="muted">Live status of active student applications moving through hiring rounds.</p>
          </div>
          <span className="badge">Real-Time Sync</span>
        </div>

        <div className="funnel-grid">
          <div className="funnel-step">
            <div className="funnel-number">{liveApplicationsCount}</div>
            <div className="funnel-title">Total Applications</div>
            <div className="funnel-bar"><div className="funnel-fill" style={{ width: "100%" }} /></div>
            <span className="funnel-meta">Stage 1: Applied</span>
          </div>

          <div className="funnel-step">
            <div className="funnel-number">{liveShortlisted}</div>
            <div className="funnel-title">Shortlisted</div>
            <div className="funnel-bar">
              <div
                className="funnel-fill"
                style={{
                  width: `${liveApplicationsCount ? (liveShortlisted / liveApplicationsCount) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="funnel-meta">Stage 2: Online Assessment</span>
          </div>

          <div className="funnel-step">
            <div className="funnel-number">{applications.filter((a) => a.stage === 3).length}</div>
            <div className="funnel-title">Interviews Scheduled</div>
            <div className="funnel-bar">
              <div
                className="funnel-fill"
                style={{
                  width: `${liveApplicationsCount ? (applications.filter((a) => a.stage === 3).length / liveApplicationsCount) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="funnel-meta">Stage 3: Technical & HR</span>
          </div>

          <div className="funnel-step highlight-step">
            <div className="funnel-number">{liveSelected}</div>
            <div className="funnel-title">Selected / Offers</div>
            <div className="funnel-bar">
              <div
                className="funnel-fill selected-fill"
                style={{
                  width: `${liveApplicationsCount ? (liveSelected / liveApplicationsCount) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="funnel-meta">Stage 4: Final Offer</span>
          </div>
        </div>
      </div>

      {/* Two Column Visual Charts Grid */}
      <div className="charts-grid-2">
        {/* Chart 1: Salary Package Histogram (Vertical Column Chart) */}
        <div className="panel chart-card">
          <div className="chart-header">
            <div>
              <h3>Salary Package Distribution</h3>
              <p className="muted">Number of students placed across salary brackets</p>
            </div>
            <span className="chart-tag">CTC Ranges</span>
          </div>

          <div className="column-chart-container">
            <div className="column-chart">
              {salaryDistribution.map((s) => {
                const heightPercent = (s.count / maxSalaryCount) * 100;
                return (
                  <div className="column-chart-item" key={s.range}>
                    <div className="column-tooltip">
                      <strong>{s.count} Students</strong>
                      <span>({s.percentage}% of cohort)</span>
                    </div>
                    <span className="column-value-top">{s.count}</span>
                    <div className="column-bar-wrapper">
                      <div
                        className="column-bar-fill"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="column-label">{s.range}</span>
                    <span className="column-sublabel">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chart 2: Company-wise Placements (Horizontal Progress Bar Chart) */}
        <div className="panel chart-card">
          <div className="chart-header">
            <div>
              <h3>Company-wise Recruitment Volume</h3>
              <p className="muted">Top recruiters by offers accepted this season</p>
            </div>
            <span className="chart-tag">Top Partners</span>
          </div>

          <div className="horizontal-bars-container">
            {companyWise.map((c) => {
              const widthPercent = (c.placed / maxPlacedCompany) * 100;
              return (
                <div className="hbar-row" key={c.company}>
                  <div className="hbar-info">
                    <span className="hbar-company">{c.company}</span>
                    <span className="hbar-role">{c.role}</span>
                  </div>
                  <div className="hbar-track">
                    <div
                      className="hbar-fill"
                      style={{ width: `${widthPercent}%` }}
                    >
                      <span className="hbar-inner-text">{c.placed} placed</span>
                    </div>
                  </div>
                  <div className="hbar-stat">
                    <span className="hbar-placed-badge">{c.placed}</span>
                    <span className="hbar-ctc">{c.avgPackage}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Branch-Wise Performance & Academic Comparison */}
      <div className="charts-grid-2">
        {/* Branch Wise Placements */}
        <div className="panel chart-card">
          <div className="chart-header">
            <div>
              <h3>Department-wise Placement Success</h3>
              <p className="muted">Placement percentages by engineering branch</p>
            </div>
            <span className="chart-tag">Branch Metrics</span>
          </div>

          <div className="branch-list">
            {branchWise.map((b) => (
              <div className="branch-item" key={b.branch}>
                <div className="branch-title-row">
                  <span className="branch-name">{b.branch}</span>
                  <span className="branch-ratio">
                    {b.placed} / {b.total} Placed ({b.percentage}%)
                  </span>
                </div>
                <div className="branch-track">
                  <div
                    className="branch-fill"
                    style={{ width: `${b.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Year Growth History Table */}
        <div className="panel chart-card">
          <div className="chart-header">
            <div>
              <h3>Year-Over-Year Placement Trends</h3>
              <p className="muted">Consistent growth over the last 4 academic sessions</p>
            </div>
            <span className="chart-tag">4-Year History</span>
          </div>

          <div className="history-table-wrapper">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Academic Year</th>
                  <th>Companies</th>
                  <th>Placed</th>
                  <th>Highest</th>
                  <th>Average</th>
                  <th>Placement %</th>
                </tr>
              </thead>
              <tbody>
                {yearlyComparison.map((y) => (
                  <tr key={y.year} className={y.year.includes("Current") ? "current-year-row" : ""}>
                    <td>
                      <strong>{y.year}</strong>
                    </td>
                    <td>{y.companies}</td>
                    <td>{y.placed}</td>
                    <td>{y.highest}</td>
                    <td>{y.avg}</td>
                    <td>
                      <span className="badge">{y.rate}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
