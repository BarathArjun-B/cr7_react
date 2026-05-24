import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../App.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/profile", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container elite-auth">
      <section className="auth-panel">
        <div className="auth-copy">
          <span className="eyebrow">Academy access</span>
          <h2>Return to your elite training room.</h2>
          <p>Track sessions, collect XP, review tactical progress, and ask the AI coach what to sharpen next.</p>
        </div>

        <form className="auth-card glass-card" onSubmit={handleLogin}>
          <div>
            <span className="eyebrow">Sign in</span>
            <h2>LA MASIA ELITE</h2>
          </div>

          {error && <p className="form-alert">{error}</p>}

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
              placeholder="Your secure password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Authenticating..." : "Enter dashboard"}
          </button>

          <p className="auth-switch">
            New player? <Link to="/register">Create academy account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
