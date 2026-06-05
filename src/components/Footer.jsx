import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../App.css";

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="professional-footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>ProBaller Academy</h3>
          <p className="tagline">Train Like a Pro. Start as a Beginner.</p>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="YouTube">YT</a>
            <a href="#" aria-label="Twitter">X</a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/programs">Training</Link></li>
            {isAuthenticated ? (
              <li><Link to="/dashboard">Dashboard</Link></li>
            ) : (
              <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Info</h3>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="mailto:proballer@academy.com">proballer@academy.com</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 ProBaller Academy. All rights reserved.</p>
        <p>Built with ❤️ for footballers worldwide.</p>
      </div>
    </footer>
  );
}
