import { useEffect, useState, useRef, useCallback } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Training", path: "/training" },
  { label: "Programs", path: "/programs" },
  { label: "Dashboard", path: "/dashboard" }
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  }, [logout, navigate]);

  const navClass = [
    "site-nav",
    scrolled || location.pathname !== "/" ? "site-nav-scrolled" : "site-nav-floating"
  ].join(" ");

  return (
    <header className={navClass}>
      <div className="site-nav-shell">
        <button className="site-logo" onClick={() => navigate("/")}>
          <span className="site-logo-mark">L</span>
          <span className="site-logo-copy">
            <strong>LA MASIA ELITE</strong>
            <small>Football Academy Platform</small>
          </span>
        </button>

        <nav className={`site-nav-links ${menuOpen ? "is-open" : ""}`} ref={menuRef}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => isActive ? "nav-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive ? "nav-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </NavLink>
          )}
          {!isAuthenticated ? (
            <Link className="site-nav-cta" to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          ) : (
            <button className="site-nav-cta is-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>

        <button
          className={`site-nav-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
