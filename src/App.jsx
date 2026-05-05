import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Programs from "./pages/Programs";
import ActiveWorkout from "./pages/ActiveWorkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Training from "./pages/Training";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/training" element={<Training />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/programs" element={<Programs />} />

        {/* ✅ Redirect if no position */}
        <Route path="/workout" element={<Navigate to="/workout/Attacker" />} />

        {/* ✅ Main route */}
        <Route path="/workout/:position" element={<ActiveWorkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;