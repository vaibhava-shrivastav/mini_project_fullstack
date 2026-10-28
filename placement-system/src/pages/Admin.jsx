
import { useState } from "react";
import DriveForm from "../components/DriveForm";

export default function Admin() {
  const [drives, setDrives] = useState([]);

  const addDrive = (form) => {
    setDrives((previous) => [
      ...previous,
      { ...form, id: Date.now() },
    ]);
  };

  const deleteDrive = (id) => {
    setDrives((previous) => previous.filter((drive) => drive.id !== id));
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

        {drives.length === 0 && (
          <p className="empty">No drives added yet.</p>
        )}

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
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteDrive(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}