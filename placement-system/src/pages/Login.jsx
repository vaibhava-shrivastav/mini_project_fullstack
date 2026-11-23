import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(form.username.trim(), form.password);
    if (!user) return setError("Invalid username or password");
    navigate(user.role === "admin" ? "/admin" : "/");
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Placement & Career System</h2>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="btn">Login</button>
        <p className="login-hint">Demo: student / student123 &nbsp;|&nbsp; admin / admin123</p>
      </form>
    </div>
  );
}
