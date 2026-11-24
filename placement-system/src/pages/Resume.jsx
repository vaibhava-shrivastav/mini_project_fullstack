import { useState } from "react";
import { student } from "../data/studentData";
import "./Resume.css";

const defaultResume = {
  fullName: student?.name || "Vedant Bansal",
  title: "B.Tech Computer Science & Engineering | Aspiring Software Engineer",
  email: "vedant.bansal@gla.ac.in",
  phone: "+91 98765 43210",
  location: "Mathura, UP, India",
  linkedin: "linkedin.com/in/vedantbansal",
  github: "github.com/vedantbansal",
  summary:
    "Proactive and detail-oriented Computer Science undergraduate with a solid foundation in data structures, algorithms, and full-stack web development. Experienced in building responsive web applications with React and modern JavaScript. Seeking a challenging Software Engineer opportunity to contribute to high-impact technical initiatives.",
  education:
    "GLA University, Mathura\nB.Tech in Computer Science and Engineering | 2022 – 2026 | CGPA: 8.7 / 10\n\nDelhi Public School\nSenior Secondary Education (CBSE Class XII) | 2021 – 2022 | Percentage: 91.5%",
  skills:
    "Programming Languages: Java, JavaScript (ES6+), Python, SQL, C++\nFrontend Development: React.js, HTML5, CSS3, Vite, Responsive Design\nBackend & Databases: Node.js, Express, MySQL, MongoDB\nDeveloper Tools: Git, GitHub, VS Code, Postman, Vercel\nCore Concepts: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Computer Networks",
  projects:
    "Placement & Career Management System | React, Vite, Context API, CSS3\n• Built an end-to-end recruitment management portal supporting student application tracking and placement cell admin controls.\n• Designed role-based navigation, live status boards, and an interactive real-time resume generator with print-ready PDF export.\n• Implemented persistent client storage via custom localStorage synchronization hooks.\n\nSmart Task & Workflow Manager | React.js, LocalStorage, CSS Flexbox\n• Developed an agile Kanban task tracking web app with category filtering, search, and activity timestamps.\n• Optimized rendering performance and state updates to ensure responsive task reassignment.",
  certifications:
    "• Meta Front-End Developer Professional Certificate (Coursera)\n• Solved 250+ Algorithmic Problems across LeetCode and GeeksforGeeks\n• Finalist, GLA Annual Innovation Hackathon 2025\n• Certified in Database Management Systems (NPTEL Elite)",
};

export default function Resume() {
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem("resume");
      if (saved) {
        return { ...defaultResume, ...JSON.parse(saved) };
      }
      return defaultResume;
    } catch {
      return defaultResume;
    }
  });

  const [saved, setSaved] = useState(false);
  const [viewMode, setViewMode] = useState("split"); // 'split' | 'preview' | 'edit'

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("resume", JSON.stringify(resume));
    setSaved(true);
  };

  const handleReset = () => {
    if (window.confirm("Reset resume to standard placement sample data?")) {
      setResume(defaultResume);
      localStorage.setItem("resume", JSON.stringify(defaultResume));
      setSaved(true);
    }
  };

  const handleLoadProfile = () => {
    try {
      const profile = JSON.parse(localStorage.getItem("profile"));
      if (profile) {
        setResume((prev) => ({
          ...prev,
          fullName: profile.name || prev.fullName,
          email: profile.email || prev.email,
          phone: profile.phone || prev.phone,
          title: `B.Tech ${profile.branch || "CSE"} | CGPA: ${profile.cgpa || "8.7"}`,
          skills: Array.isArray(profile.skills)
            ? `Technical Skills: ${profile.skills.join(", ")}`
            : prev.skills,
        }));
        setSaved(false);
      } else {
        alert("No saved profile found. Please update your profile page first.");
      }
    } catch {
      alert("Could not load profile data.");
    }
  };

  // Helper to render formatted blocks with bullet support
  const renderFormattedBlock = (text) => {
    if (!text) return <p className="resume-empty-note">No information provided yet.</p>;

    const lines = text.split("\n");
    const elements = [];
    let currentList = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="resume-bullet-list">
            {currentList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        return;
      }

      // Check if bullet point
      if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
        const bulletText = trimmed.replace(/^[•\-*]\s*/, "");
        currentList.push(bulletText);
      } else if (trimmed.includes(":") && !trimmed.includes("http")) {
        // Categorized skills (e.g. Languages: Java, Python)
        flushList();
        const [cat, ...rest] = trimmed.split(":");
        elements.push(
          <p key={index} className="resume-category-line">
            <span className="resume-cat-label">{cat.trim()}:</span>
            <span className="resume-cat-content"> {rest.join(":").trim()}</span>
          </p>
        );
      } else if (trimmed.includes("|")) {
        // Subheading with metadata (e.g. Title | Tech Stack | Year)
        flushList();
        const parts = trimmed.split("|").map((p) => p.trim());
        elements.push(
          <div key={index} className="resume-entry-header">
            <span className="resume-entry-title">{parts[0]}</span>
            {parts.length > 1 && (
              <span className="resume-entry-meta">{parts.slice(1).join(" • ")}</span>
            )}
          </div>
        );
      } else {
        flushList();
        elements.push(
          <p key={index} className="resume-plain-line">
            {trimmed}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <div className="resume-container">
      {/* Top Controls Header */}
      <div className="resume-header no-print">
        <div>
          <h2>Resume Builder & Live Preview</h2>
          <p className="muted">
            Craft, preview, and export a recruiter-ready resume for campus placements.
          </p>
        </div>

        <div className="resume-actions">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "split" ? "active" : ""}`}
              onClick={() => setViewMode("split")}
              type="button"
            >
              Split View
            </button>
            <button
              className={`view-btn ${viewMode === "preview" ? "active" : ""}`}
              onClick={() => setViewMode("preview")}
              type="button"
            >
              Resume Preview
            </button>
            <button
              className={`view-btn ${viewMode === "edit" ? "active" : ""}`}
              onClick={() => setViewMode("edit")}
              type="button"
            >
              Editor
            </button>
          </div>

          <button className="btn" onClick={handleSave} type="button">
            Save Resume
          </button>
          <button
            className="btn btn-print"
            onClick={() => window.print()}
            type="button"
            title="Download PDF or Print"
          >
            🖨️ Print / Download PDF
          </button>
        </div>
      </div>

      {saved && (
        <div className="saved-toast no-print">
          ✓ Resume saved successfully to local storage.
        </div>
      )}

      {/* Main Workspace */}
      <div className={`resume-workspace mode-${viewMode}`}>
        {/* Editor Form Column */}
        {(viewMode === "split" || viewMode === "edit") && (
          <div className="resume-editor-col no-print">
            <div className="editor-card">
              <div className="editor-header">
                <h3>Edit Resume Details</h3>
                <div className="editor-quick-links">
                  <button
                    type="button"
                    className="btn-link"
                    onClick={handleLoadProfile}
                    title="Import name and skills from your profile"
                  >
                    Import Profile
                  </button>
                  <button
                    type="button"
                    className="btn-link text-muted"
                    onClick={handleReset}
                  >
                    Reset Sample
                  </button>
                </div>
              </div>

              {/* Personal Info */}
              <div className="form-group-section">
                <h4>1. Personal & Contact Info</h4>
                <div className="form-grid-2">
                  <div>
                    <label>Full Name</label>
                    <input
                      name="fullName"
                      value={resume.fullName || ""}
                      onChange={handleChange}
                      placeholder="e.g. Vedant Bansal"
                    />
                  </div>
                  <div>
                    <label>Professional Subtitle</label>
                    <input
                      name="title"
                      value={resume.title || ""}
                      onChange={handleChange}
                      placeholder="e.g. B.Tech Computer Science | Full Stack Developer"
                    />
                  </div>
                  <div>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={resume.email || ""}
                      onChange={handleChange}
                      placeholder="e.g. student@gla.ac.in"
                    />
                  </div>
                  <div>
                    <label>Phone Number</label>
                    <input
                      name="phone"
                      value={resume.phone || ""}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                  <div>
                    <label>Location</label>
                    <input
                      name="location"
                      value={resume.location || ""}
                      onChange={handleChange}
                      placeholder="e.g. Mathura, UP, India"
                    />
                  </div>
                  <div>
                    <label>LinkedIn / Portfolio</label>
                    <input
                      name="linkedin"
                      value={resume.linkedin || ""}
                      onChange={handleChange}
                      placeholder="e.g. linkedin.com/in/username"
                    />
                  </div>
                </div>
                <div>
                  <label>GitHub Profile</label>
                  <input
                    name="github"
                    value={resume.github || ""}
                    onChange={handleChange}
                    placeholder="e.g. github.com/username"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="form-group-section">
                <h4>2. Professional Summary</h4>
                <textarea
                  name="summary"
                  rows={4}
                  value={resume.summary || ""}
                  onChange={handleChange}
                  placeholder="2-3 sentences highlighting your academic strengths, core technologies, and career objectives..."
                />
              </div>

              {/* Education */}
              <div className="form-group-section">
                <h4>3. Education</h4>
                <p className="field-hint">
                  Separate institutions with empty lines. Use '|' to separate Degree, Year, and CGPA.
                </p>
                <textarea
                  name="education"
                  rows={4}
                  value={resume.education || ""}
                  onChange={handleChange}
                  placeholder="GLA University, Mathura&#10;B.Tech Computer Science | 2022 – 2026 | CGPA: 8.7"
                />
              </div>

              {/* Skills */}
              <div className="form-group-section">
                <h4>4. Technical Skills</h4>
                <p className="field-hint">
                  Format as "Category: Skill 1, Skill 2" for bold category headers.
                </p>
                <textarea
                  name="skills"
                  rows={4}
                  value={resume.skills || ""}
                  onChange={handleChange}
                  placeholder="Languages: Java, JavaScript, Python, SQL&#10;Frontend: React, HTML, CSS, Vite"
                />
              </div>

              {/* Projects */}
              <div className="form-group-section">
                <h4>5. Projects</h4>
                <p className="field-hint">
                  Use "Project Name | Tech Stack" on first line, then "• Bullet" for bulleted highlights.
                </p>
                <textarea
                  name="projects"
                  rows={5}
                  value={resume.projects || ""}
                  onChange={handleChange}
                  placeholder="Project Name | React, Node.js&#10;• Built a full-stack portal...&#10;• Implemented role-based login..."
                />
              </div>

              {/* Certifications & Achievements */}
              <div className="form-group-section">
                <h4>6. Certifications & Achievements</h4>
                <p className="field-hint">Use "• " at the start of each achievement.</p>
                <textarea
                  name="certifications"
                  rows={3}
                  value={resume.certifications || ""}
                  onChange={handleChange}
                  placeholder="• Meta Front-End Specialization&#10;• Solved 200+ LeetCode problems"
                />
              </div>

              <div className="form-bottom-actions">
                <button className="btn" onClick={handleSave} type="button">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Resume Preview Column (Authentic A4 Paper Styling) */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div className="resume-preview-col">
            <div className="resume-sheet">
              {/* Header / Personal Details */}
              <header className="resume-sheet-header">
                <h1 className="resume-name">{resume.fullName || "Student Name"}</h1>
                {resume.title && <div className="resume-title">{resume.title}</div>}

                <div className="resume-contacts">
                  {resume.email && (
                    <span className="contact-item">
                      <span className="contact-icon">✉</span> {resume.email}
                    </span>
                  )}
                  {resume.phone && (
                    <span className="contact-item">
                      <span className="contact-icon">☎</span> {resume.phone}
                    </span>
                  )}
                  {resume.location && (
                    <span className="contact-item">
                      <span className="contact-icon">📍</span> {resume.location}
                    </span>
                  )}
                  {resume.linkedin && (
                    <span className="contact-item">
                      <span className="contact-icon">🔗</span> {resume.linkedin}
                    </span>
                  )}
                  {resume.github && (
                    <span className="contact-item">
                      <span className="contact-icon">🐙</span> {resume.github}
                    </span>
                  )}
                </div>
              </header>

              {/* Summary */}
              {resume.summary && (
                <section className="resume-section">
                  <h2 className="resume-section-title">Professional Summary</h2>
                  <div className="resume-section-body">
                    {renderFormattedBlock(resume.summary)}
                  </div>
                </section>
              )}

              {/* Education */}
              {resume.education && (
                <section className="resume-section">
                  <h2 className="resume-section-title">Education</h2>
                  <div className="resume-section-body">
                    {renderFormattedBlock(resume.education)}
                  </div>
                </section>
              )}

              {/* Technical Skills */}
              {resume.skills && (
                <section className="resume-section">
                  <h2 className="resume-section-title">Technical Skills</h2>
                  <div className="resume-section-body">
                    {renderFormattedBlock(resume.skills)}
                  </div>
                </section>
              )}

              {/* Projects */}
              {resume.projects && (
                <section className="resume-section">
                  <h2 className="resume-section-title">Academic & Technical Projects</h2>
                  <div className="resume-section-body">
                    {renderFormattedBlock(resume.projects)}
                  </div>
                </section>
              )}

              {/* Certifications & Achievements */}
              {resume.certifications && (
                <section className="resume-section">
                  <h2 className="resume-section-title">Certifications & Achievements</h2>
                  <div className="resume-section-body">
                    {renderFormattedBlock(resume.certifications)}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
