import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../App.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, googleLogin } = useAuth();
  const redirectPath = location.state?.from?.pathname || "/profile";

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.trim()) {
      setError("Enter your full name to create an academy profile.");
      return;
    }
    if (!emailPattern.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({ name: form.name, email: form.email, password: form.password });
      setMessage("Account created. Your academy dashboard is ready.");
      setTimeout(() => navigate(redirectPath), 600);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setMessage("");
    setGoogleLoading(true);

    try {
      await googleLogin();
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Google sign-in failed. Try again.");
    } finally {
      setGoogleLoading(false);
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

          <label>
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              minLength={6}
              required
            />
          </label>

          <button type="submit" disabled={loading || googleLoading}>
            {loading ? "Creating profile..." : "Create academy account"}
          </button>

          <div className="auth-divider">
            <span />
            <p>or</p>
            <span />
          </div>

          <button
            className="google-auth-button"
            type="button"
            disabled={loading || googleLoading}
            onClick={handleGoogleRegister}
          >
            <span className="google-mark">G</span>
            {googleLoading ? "Opening Google..." : "Continue with Google"}
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
