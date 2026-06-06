import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import "../App.css";

const categories = ["Warmup", "Technical", "Shooting", "Fitness", "Recovery"];

function StatCard({ label, value, meta }) {
  return (
    <article className="dashboard-card stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{meta}</small>
    </article>
  );
}

function Profile() {
  const { currentUser, logout } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [coachMessage, setCoachMessage] = useState("How can I improve weak foot passing?");
  const [coachReply, setCoachReply] = useState(null);
  const [loadingCoach, setLoadingCoach] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setDashboard(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error.message);
      }
    };

    fetchDashboard();
  }, []);

  const player = dashboard?.player || currentUser;
  const analytics = dashboard?.analytics;
  const workouts = dashboard?.workouts || [];

  const maxHeat = useMemo(() => {
    const values = categories.map((category) => analytics?.trainingHeatmaps?.[category] || 0);
    return Math.max(...values, 1);
  }, [analytics]);

  const askCoach = async (event) => {
    event.preventDefault();
    setLoadingCoach(true);

    try {
      const response = await api.post("/ai/coach", {
        message: coachMessage,
        position: analytics?.positionSpecialization || "All"
      });
      setCoachReply(response.data.data);
    } catch (error) {
      console.error("Coach error:", error.message);
    } finally {
      setLoadingCoach(false);
    }
  };

  const refreshDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data.data);
    } catch (error) {
      console.error("Refresh failed:", error.message);
    }
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Player command center</span>
          <h1>{player?.name || "Elite Player"}</h1>
          <p>Live progress, training intelligence, and AI coaching built around your football development.</p>
        </div>
        <button className="ghost-button" onClick={refreshDashboard}>Sync data</button>
      </section>

      <section className="stats-grid">
        <StatCard label="Level" value={player?.level || 1} meta={`${player?.xpProgress || 0}% to next level`} />
        <StatCard label="Total XP" value={player?.XP || 0} meta={`${player?.nextLevelXP || 500} XP target`} />
        <StatCard label="Weekly streak" value={`${player?.streak || 0} days`} meta="Consistency score" />
        <StatCard label="Workouts" value={player?.workoutsCompleted || 0} meta="Completed sessions" />
      </section>

      <section className="dashboard-layout">
        <div className="dashboard-main">
          <article className="dashboard-card progress-card">
            <div className="section-head">
              <div>
                <span className="eyebrow">XP Progress</span>
                <h2>Academy level {player?.level || 1}</h2>
              </div>
              <strong>{player?.XP || 0} XP</strong>
            </div>
            <div className="xp-track">
              <span style={{ width: `${player?.xpProgress || 0}%` }} />
            </div>
          </article>

          <article className="dashboard-card">
            <div className="section-head">
              <div>
                <span className="eyebrow">Training heatmap</span>
                <h2>Category load</h2>
              </div>
              <small>{analytics?.minutesTrained || 0} minutes trained</small>
            </div>
            <div className="heatmap-bars">
              {categories.map((category) => {
                const value = analytics?.trainingHeatmaps?.[category] || 0;
                return (
                  <div className="heat-row" key={category}>
                    <span>{category}</span>
                    <div><i style={{ width: `${(value / maxHeat) * 100}%` }} /></div>
                    <strong>{value}</strong>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="dashboard-card">
            <div className="section-head">
              <div>
                <span className="eyebrow">Training history</span>
                <h2>Recent sessions</h2>
              </div>
            </div>
            <div className="timeline">
              {workouts.length ? (
                workouts.map((workout) => (
                  <div className="timeline-item" key={workout._id}>
                    <span>{workout.category}</span>
                    <div>
                      <h3>{workout.title}</h3>
                      <p>{workout.position} / {workout.duration} min / +{workout.xpEarned} XP</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">Complete a workout to start building your academy timeline.</p>
              )}
            </div>
          </article>
        </div>

        <aside className="dashboard-side">
          <article className="dashboard-card coach-card">
            <span className="eyebrow">AI football coach</span>
            <h2>Ask for your next edge</h2>
            <form onSubmit={askCoach}>
              <textarea
                value={coachMessage}
                onChange={(event) => setCoachMessage(event.target.value)}
                rows={5}
              />
              <button type="submit" disabled={loadingCoach}>
                {loadingCoach ? "Thinking..." : "Ask coach"}
              </button>
            </form>
            {coachReply && (
              <div className="coach-reply">
                <p>{coachReply.answer}</p>
                {coachReply.drills?.slice(0, 3).map((drill) => (
                  <div key={drill.title}>
                    <strong>{drill.title}</strong>
                    <span>{drill.duration} min / {drill.difficulty}</span>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="dashboard-card badges-card">
            <span className="eyebrow">Badges</span>
            <h2>Player identity</h2>
            <div className="badge-list">
              {(player?.badges?.length ? player.badges : [{ name: "Academy Prospect" }]).map((badge) => (
                <span key={badge.name}>{badge.name}</span>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}

export default Profile;
