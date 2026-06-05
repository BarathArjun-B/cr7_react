import "../App.css";

export default function ActivityFeed({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="activity-feed empty">
        <p>No sessions yet. Start your first workout!</p>
      </div>
    );
  }

  return (
    <div className="activity-feed">
      <h3>Recent Activity Feed</h3>
      <ul className="activity-list">
        {activities.slice(0, 5).map((activity, index) => (
          <li key={index} className="activity-item">
            <div className="activity-details">
              <strong>{activity.phase}</strong>
              <span>{activity.position} • {activity.durationMinutes} min</span>
            </div>
            <div className="activity-date">
              {new Date(activity.date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
