import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../App.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", position: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
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

          {errors.form && <p className="form-alert">{errors.form}</p>}
          
          {success && (
            <div className="toast-success">
              Registration successful! Redirecting...
            </div>
          )}

          <div className="input-group">
            <label>Full name</label>
            <input
              type="text"
              name="name"
              placeholder="Alex Martinez"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.name && <span className="inline-error">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="player@academy.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && <span className="inline-error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.password && <span className="inline-error">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label>Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.confirmPassword && <span className="inline-error">{errors.confirmPassword}</span>}
          </div>

          <div className="input-group">
            <label>Primary Position</label>
            <select name="position" value={form.position} onChange={handleChange} onBlur={handleBlur} required>
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
