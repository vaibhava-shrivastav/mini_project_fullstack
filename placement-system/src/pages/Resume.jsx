
import { useState } from "react";
import "./Resume.css";

const empty = { summary: "", education: "", skills: "", projects: "" };

export default function Resume() {
  const [resume, setResume] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("resume")) || empty;
    } catch {
      return empty;
    }
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("resume", JSON.stringify(resume));
    setSaved(true);
  };

  return (
    <div>
      <h2>Resume Management</h2>

      <div className="resume-wrap">
        <div className="resume-form no-print">
          <label>Summary</label>
          <textarea name="summary" value={resume.summary} onChange={handleChange} />

          <label>Education</label>
          <textarea name="education" value={resume.education} onChange={handleChange} />

          <label>Skills</label>
          <textarea name="skills" value={resume.skills} onChange={handleChange} />

          <label>Projects</label>
          <textarea name="projects" value={resume.projects} onChange={handleChange} />

          <div>
            <button className="btn" onClick={handleSave}>Save Resume</button>{" "}
            <button className="btn" onClick={() => window.print()}>
              Print / Save PDF
            </button>
          </div>

          {saved && <p className="saved-msg">Resume saved.</p>}
        </div>

        <div className="resume-preview panel">
          <h3>Preview</h3>
          <h4>Summary</h4>
          <p>{resume.summary || "-"}</p>

          <h4>Education</h4>
          <p>{resume.education || "-"}</p>

          <h4>Skills</h4>
          <p>{resume.skills || "-"}</p>

          <h4>Projects</h4>
          <p>{resume.projects || "-"}</p>
        </div>
      </div>
    </div>
  );
}
