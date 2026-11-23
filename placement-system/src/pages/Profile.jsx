
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { student } from "../data/studentData";

export default function Profile() {
  const [profile, setProfile] = useLocalStorage("profile", student);

  const [form, setForm] = useState({
    ...profile,
    skills: profile.skills.join(", "),
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProfile({
      ...form,
      cgpa: Number(form.cgpa),
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
    });

    setSaved(true);
  };

  return (
    <div>
      <h2>My Profile</h2>

      <form className="resume-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Roll No</label>
        <input
          name="rollNo"
          value={form.rollNo}
          onChange={handleChange}
          required
        />

        <label>Branch</label>
        <input
          name="branch"
          value={form.branch}
          onChange={handleChange}
          required
        />

        <label>CGPA</label>
        <input
          type="number"
          name="cgpa"
          min="0"
          max="10"
          step="0.01"
          value={form.cgpa}
          onChange={handleChange}
          required
        />

        <label>Phone (10 digits)</label>
        <input
          name="phone"
          pattern="[0-9]{10}"
          title="Enter 10 digit number"
          value={form.phone || ""}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email || ""}
          onChange={handleChange}
        />

        <label>Skills (comma separated)</label>
        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Save Profile
        </button>

        {saved && <p className="saved-msg">Profile updated.</p>}
      </form>
    </div>
  );
}
