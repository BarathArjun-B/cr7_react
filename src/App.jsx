import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Programs from "./pages/Programs";
import ActiveWorkout from "./pages/ActiveWorkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Training from "./pages/Training";
import Dashboard from "./pages/Dashboard";
import Tutorial from "./pages/Tutorial";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

function Layout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/training" element={<Training />} />
          <Route path="/tutorial/:type" element={<Tutorial />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/programs" element={<Programs />} />
          <Route path="/workout" element={<Navigate to="/workout/Attacker" />} />
          <Route path="/workout/:position" element={<ActiveWorkout />} />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
