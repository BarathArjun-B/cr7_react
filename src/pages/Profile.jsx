import { useEffect, useState } from "react";
import API from "../api";
import "../App.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>My Profile</h2>

        {user ? (
          <>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;