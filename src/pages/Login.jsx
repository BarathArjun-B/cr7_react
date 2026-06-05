import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../App.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const redirectPath = location.state?.from?.pathname || "/dashboard";

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setLoading(true);

    try {
      await login(form.email, form.password, form.remember);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Check your credentials and try again.");
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
          <p>Track sessions, collect XP, review tactical progress, and build your profile locally in your browser.</p>
        </div>

        <form className="auth-card glass-card" onSubmit={handleLogin}>
          <div>
            <span className="eyebrow">Sign in</span>
            <h2>LA MASIA ELITE</h2>
          </div>

          {error && <p className="form-alert">{error}</p>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="player@academy.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-input-wrapper" style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your secure password"
                value={form.password}
                onChange={handleChange}
                style={{ width: "100%", paddingRight: "40px" }}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#aaa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "5px"
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>

          <label className="checkbox-label" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginTop: "10px", color: "#ccc", fontSize: "14px" }}>
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              style={{ width: "auto", margin: 0 }}
            />
            Remember me
          </label>

          <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
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
