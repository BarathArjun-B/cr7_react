import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../App.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await register(form);
      setMessage("Account created. Your academy dashboard is ready.");
      setTimeout(() => navigate("/profile"), 600);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container elite-auth">
      <section className="auth-panel register-panel">
        <div className="auth-copy">
          <span className="eyebrow">Player onboarding</span>
          <h2>Build your football identity from day one.</h2>
          <p>Secure profile, XP progression, session history, badges, analytics, and AI coaching in one academy-grade platform.</p>
        </div>

        <form className="auth-card glass-card" onSubmit={handleRegister}>
          <div>
            <span className="eyebrow">Create account</span>
            <h2>Join LA MASIA ELITE</h2>
          </div>

          {error && <p className="form-alert">{error}</p>}
          {message && <p className="form-success">{message}</p>}

          <label>
            Full name
            <input
              type="text"
              name="name"
              placeholder="Alex Martinez"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="player@academy.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Creating profile..." : "Create academy account"}
          </button>

          <p className="auth-switch">
            Already training? <Link to="/login">Log in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
