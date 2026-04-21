import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <h1 className="logo">⚽ <b>ProBaller Academy</b></h1>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/training">Training</Link></li>
        <li><Link to="/programs">Programs</Link></li>

        {!token ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <span
                onClick={handleLogout}
                style={{ cursor: "pointer", color: "#22c55e" }}
              >
                Logout
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;