import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Training", path: "/training" },
  { label: "Programs", path: "/programs" },
  { label: "Dashboard", path: "/profile" }
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  };

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

        <nav className={`site-nav-links ${menuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
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
