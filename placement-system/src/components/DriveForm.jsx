import { useState } from "react";

export default function DriveForm({ onAdd }) {
  const [form, setForm] = useState({ company: "", role: "", package: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ company: "", role: "", package: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="drive-form">
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
      <input name="package" placeholder="Package" value={form.package} onChange={handleChange} required />
      <button type="submit">Add Drive</button>
    </form>
  );
}
