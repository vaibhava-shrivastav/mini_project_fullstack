
import { useState } from "react";

const empty = { company: "", role: "", package: "", location: "", eligibility: "", skills: "", deadline: "" };

export default function DriveForm({ onAdd }) {
  const [form, setForm] = useState(empty);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="drive-form">
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
      <input name="package" placeholder="Package (e.g. 8 LPA)" value={form.package} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="eligibility" placeholder="Eligibility (e.g. CGPA >= 6.5)" value={form.eligibility} onChange={handleChange} required />
      <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} required />
      <input type="date" name="deadline" value={form.deadline} onChange={handleChange} required />
      <button type="submit" className="btn">Add Drive</button>
    </form>
  );
}