import { useState } from "react";
import { companies } from "../data/adminData";
import DriveForm from "../components/DriveForm";

export default function Admin() {
  const [drives, setDrives] = useState([]);

  const addDrive = (drive) => setDrives([...drives, drive]);

  return (
    <div>
      <h2>Placement Cell Admin</h2>

      <h3>Add New Placement Drive</h3>
      <DriveForm onAdd={addDrive} />

      <h3>Added Drives</h3>
      <ul>
        {drives.map((d, i) => (
          <li key={i}>{d.company} — {d.role} ({d.package})</li>
        ))}
      </ul>

      <h3>Company Records</h3>
      <table>
        <thead><tr><th>Company</th><th>Status</th></tr></thead>
        <tbody>
          {companies.map((c, i) => (
            <tr key={i}><td>{c.name}</td><td>{c.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
