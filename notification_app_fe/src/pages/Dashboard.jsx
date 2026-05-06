import { useEffect, useState } from "react";
import { fetchPriorityNotifications } from "../utils/api";

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);

    const data = await fetchPriorityNotifications();
    setNotifications(data);

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📩 Priority Notifications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        notifications.map((n, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "6px",
              background: "#f9f9f9"
            }}
          >
            <h4 style={{ margin: 0 }}>
              {n.type.toUpperCase()}
            </h4>

            <p>{n.message}</p>

            <small>
              {n.timestamp.toString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}