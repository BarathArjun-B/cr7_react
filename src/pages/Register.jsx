import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../App.css";

function PasswordStrength({ password }) {
  if (!password) return null;
  const strength = password.length >= 12 ? "Strong" : password.length >= 8 ? "Good" : "Weak";
  const colors = { Weak: "#ef4444", Good: "#f59e0b", Strong: "#22c55e" };
  const widths = { Weak: "33%", Good: "66%", Strong: "100%" };
  return (
    <div style={{ marginTop: "6px" }}>
      <div style={{ height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
        <div style={{ height: "100%", width: widths[strength], background: colors[strength], borderRadius: "2px", transition: "width 0.3s ease" }} />
      </div>
      <span style={{ fontSize: "12px", color: colors[strength] }}>{strength} password</span>
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", position: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email format";
    } else if (name === "password" && value.length < 8) {
      error = "Password must be at least 8 characters";
    } else if (name === "confirmPassword" && value !== form.password) {
      error = "Passwords do not match";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleBlur = (event) => {
    validateField(event.target.name, event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    
    const isValid = Object.keys(form).map(key => validateField(key, form[key])).every(Boolean);
    if (!isValid) return;

    setLoading(true);

    try {
      await register({ name: form.name, email: form.email, password: form.password, position: form.position });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setErrors({ form: err.message || "Registration failed." });
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
          <p>Secure profile, XP progression, session history, badges, and analytics natively in your browser.</p>
        </div>

        <form className="auth-card glass-card" onSubmit={handleRegister}>
          <div>
            <span className="eyebrow">Create account</span>
            <h2>Join LA MASIA ELITE</h2>
          </div>

          {/* ⚠️ DEVELOPMENT NOTE: Passwords stored locally. Integrate Firebase Auth for production. */}

          {errors.form && <p className="form-alert">{errors.form}</p>}
          
          {success && (
            <div className="toast-success">
              Registration successful! Redirecting...
            </div>
          )}

          <div className="input-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Alex Martinez"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
              required
            />
            {errors.name && <span className="inline-error">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="player@academy.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              required
            />
            {errors.email && <span className="inline-error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                style={{ width: "100%", paddingRight: "40px" }}
                required
              />
              <button 
                type="button" 
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
            <PasswordStrength password={form.password} />
            {errors.password && <span className="inline-error">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                style={{ width: "100%", paddingRight: "40px" }}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <span className="inline-error">{errors.confirmPassword}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="position">Primary Position</label>
            <select id="position" name="position" value={form.position} onChange={handleChange} onBlur={handleBlur} required>
              <option value="">Select your position</option>
              <option value="Attacker">Attacker</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
            {errors.position && <span className="inline-error">{errors.position}</span>}
          </div>

          <button type="submit" disabled={loading || success}>
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
