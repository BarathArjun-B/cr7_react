import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getActivity, getProgress } from "../utils/localStorage";
import StatsCard from "../components/StatsCard";
import ActivityFeed from "../components/ActivityFeed";
import PositionCard from "../components/PositionCard";
import ProgressBar from "../components/ProgressBar";
import attackerBg from "../assets/attack.jpg";
import midfielderBg from "../assets/mid.jpg";
import defenderBg from "../assets/def.jpg";
import gkBg from "../assets/gk.jpg";
import "../App.css";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [activities, setActivities] = useState([]);
  const [progress, setProgress] = useState({});
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setActivities(getActivity());
    setProgress(getProgress());
    setDateStr(new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const totalMinutes = activities.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);
  const workoutsCount = activities.length;
  
  // Calculate streak based on local dates
  const calculateStreak = () => {
    if (activities.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    
    // Create a set of unique dates the user trained on
    const trainedDates = new Set(activities.map(a => {
      const d = new Date(a.date);
      d.setHours(0,0,0,0);
      return d.getTime();
    }));

    // If they trained today, streak is at least 1
    if (trainedDates.has(currentDate.getTime())) {
      streak = 1;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // Check if they trained yesterday
      currentDate.setDate(currentDate.getDate() - 1);
      if (trainedDates.has(currentDate.getTime())) {
        streak = 1;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        return 0; // No streak
      }
    }

    // Count backwards
    while(trainedDates.has(currentDate.getTime())) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {currentUser?.name?.split(' ')[0] || "Player"} 👋</h1>
        <p className="dashboard-date">{dateStr}</p>
        {currentUser?.position && (
          <span className="position-badge">{currentUser.position}</span>
        )}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="stats-row">
            <StatsCard title="Sessions Completed" value={workoutsCount} />
            <StatsCard title="Current Streak" value={`${streak} Days`} />
            <StatsCard title="Favorite Position" value={currentUser?.position || "None"} />
            <StatsCard title="Total Time" value={`${totalMinutes}m`} />
          </div>

          <div className="training-modules">
            <h2>Quick Start Training</h2>
            <div className="positions-grid">
              <PositionCard position="Attacker" image={attackerBg} isFavorite={currentUser?.position === "Attacker"} />
              <PositionCard position="Midfielder" image={midfielderBg} isFavorite={currentUser?.position === "Midfielder"} />
              <PositionCard position="Defender" image={defenderBg} isFavorite={currentUser?.position === "Defender"} />
              <PositionCard position="Goalkeeper" image={gkBg} isFavorite={currentUser?.position === "Goalkeeper"} />
            </div>
          </div>
          
          <div className="progress-section" style={{ marginTop: "2rem" }}>
            <ProgressBar progress={progress} />
          </div>
        </div>

        <div className="dashboard-sidebar">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}
