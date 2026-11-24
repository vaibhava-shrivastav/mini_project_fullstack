import { useState } from "react";
import { useData } from "../context/DataContext";
import { stages } from "../data/studentData";
import DriveForm from "../components/DriveForm";

export default function Admin() {
  const {
    drives,
    addDrive,
    deleteDrive,
    applications,
    updateStage,
    announcements,
    addAnnouncement,
    deleteAnnouncement,
  } = useData();

  const [text, setText] = useState("");
  const [type, setType] = useState("announcement");

  const publish = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addAnnouncement(text.trim(), type);
    setText("");
  };

  return (
    <div>
      <h2>Placement Cell Admin</h2>

      <div className="panel">
        <h3>Add New Placement Drive</h3>
        <DriveForm onAdd={addDrive} />
      </div>

      <div className="panel">
        <h3>All Drives ({drives.length})</h3>
        {drives.length === 0 && <p className="empty">No drives added yet.</p>}

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Package</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((d) => (
              <tr key={d.id}>
                <td>{d.company}</td>
                <td>{d.role}</td>
                <td>{d.package}</td>
                <td>{d.deadline}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteDrive(d.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <h3>Update Application Status</h3>
        {applications.length === 0 && <p className="empty">No student applications yet.</p>}

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Stage</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a.driveId}>
                <td>{a.company}</td>
                <td>{a.role}</td>
                <td>
                  <select
                    value={a.stage}
                    onChange={(e) => updateStage(a.driveId, Number(e.target.value))}
                  >
                    {stages.map((s, i) => (
                      <option key={s} value={i}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <h3>Publish Announcement</h3>
        <form className="drive-form" onSubmit={publish}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Announcement text"
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="announcement">Announcement</option>
            <option value="deadline">Deadline</option>
            <option value="interview">Interview</option>
            <option value="placement">Placement</option>
            <option value="career">Career</option>
          </select>
          <button type="submit" className="btn">
            Publish
          </button>
        </form>

        <ul className="notif-list" style={{ marginTop: "1rem" }}>
          {announcements.map((a) => (
            <li
              key={a.id}
              className={`notif ${(a.type || "").toLowerCase()}`}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <strong>{a.title || (a.type ? a.type.toUpperCase() : "Announcement")}:</strong>{" "}
                <span>{a.message || a.text}</span>
              </div>
              <button className="btn btn-danger" onClick={() => deleteAnnouncement(a.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
