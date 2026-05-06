import axios from "axios";

// API URL
const API_URL =
  "/evaluation-service/notifications";

// Token
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlkaHVyZ2Euci4yMDIzLmFpZHNAcml0Y2hlbm5haS5lZHUuaW4iLCJleHAiOjE3NzgwNTA2NjMsImlhdCI6MTc3ODA0OTc2MywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjY3YzVkY2Y5LTA0ZjUtNDczMS1iMTAyLTExZDU0ZDkzMjUyNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNyaWRodXJnYSByIiwic3ViIjoiOWQzYmVmOWUtMGQxZC00Yjk4LWEwNDMtMjM5MTk1MDJhM2ZhIn0sImVtYWlsIjoic3JpZGh1cmdhLnIuMjAyMy5haWRzQHJpdGNoZW5uYWkuZWR1LmluIiwibmFtZSI6InNyaWRodXJnYSByIiwicm9sbE5vIjoiMjExNzIzMDA3MDE1NSIsImFjY2Vzc0NvZGUiOiJCVENEcVQiLCJjbGllbnRJRCI6IjlkM2JlZjllLTBkMWQtNGI5OC1hMDQzLTIzOTE5NTAyYTNmYSIsImNsaWVudFNlY3JldCI6Ik1NUGZCZEJEa0NBSG54VGEifQ.U3NiQKSjHck4rmwLUCdr6cWG05G95mdFf9RrC53lQYY";

// Priority mapping
const priorityMap = {
  placement: 3,
  result: 2,
  event: 1
};

// ✅ Fallback data (10 notifications)
const fallbackNotifications = [
  { type: "placement", message: "Google interview shortlisted", timestamp: new Date(), read: false },
  { type: "result", message: "Semester results published", timestamp: new Date(), read: false },
  { type: "event", message: "Tech fest registration open", timestamp: new Date(), read: false },

  { type: "placement", message: "Amazon hiring drive announced", timestamp: new Date(), read: false },
  { type: "result", message: "Internal marks updated", timestamp: new Date(), read: false },
  { type: "event", message: "AI workshop scheduled", timestamp: new Date(), read: false },

  { type: "placement", message: "TCS interview call received", timestamp: new Date(), read: false },
  { type: "result", message: "Assignment grades released", timestamp: new Date(), read: false },
  { type: "event", message: "Hackathon registration open", timestamp: new Date(), read: false },

  { type: "placement", message: "Infosys aptitude cleared", timestamp: new Date(), read: false }
];

// API function
export const fetchPriorityNotifications = async () => {
  try {
    console.log("Fetching notifications...");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json"
      },
      timeout: 8000
    });

    const notifications = response.data?.notifications || [];

    return processNotifications(notifications);
  } catch (error) {
    console.log("API FAILED, using fallback:", error.message);

    return processNotifications(fallbackNotifications);
  }
};

// Process + sort logic
const processNotifications = (notifications) => {
  return notifications
    .map((n) => ({
      type: (n.type || n.Type || "").toLowerCase(),
      message: n.message || n.Message || "No message",
      timestamp: new Date(n.timestamp || n.Timestamp || Date.now()),
      read: n.read ?? n.Read ?? false
    }))
    .filter((n) => !n.read)
    .sort((a, b) => {
      const priorityDiff =
        (priorityMap[b.type] || 0) - (priorityMap[a.type] || 0);

      if (priorityDiff !== 0) return priorityDiff;

      return b.timestamp - a.timestamp;
    })
    .slice(0, 10);
};