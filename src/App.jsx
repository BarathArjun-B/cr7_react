import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Training from "./pages/Training";
import Profile from "./pages/Profile";
import ActiveWorkout from "./pages/ActiveWorkout"; // ✅ ADD THIS

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

        {/* ✅ NEW ROUTE */}
        <Route path="/workout" element={<ActiveWorkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;