
import { useState } from "react";

export default function Resume() {
  const [resume, setResume] = useState({
    summary: "",
    education: "",
    skills: "",
    projects: "",
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

      <div className="resume-form">
        <label>Summary</label>
        <textarea
          name="summary"
          value={resume.summary}
          onChange={handleChange}
        />

        <label>Education</label>
        <textarea
          name="education"
          value={resume.education}
          onChange={handleChange}
        />

        <label>Skills</label>
        <textarea
          name="skills"
          value={resume.skills}
          onChange={handleChange}
        />

        <label>Projects</label>
        <textarea
          name="projects"
          value={resume.projects}
          onChange={handleChange}
        />

        <button onClick={handleSave}>Save Resume</button>

        {saved && <p className="saved-msg">Resume saved locally.</p>}
      </div>
    </div>
  );
}