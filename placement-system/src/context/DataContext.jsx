import { createContext, useContext, useState, useEffect } from "react";
import { opportunities as defaultDrives } from "../data/opportunitiesData";
import defaultNotifications from "../data/notificationsData";

const DataContext = createContext();

const normalizeNotification = (n, i = 0) => {
  const title =
    n.title ||
    (n.type
      ? `${n.type.charAt(0).toUpperCase() + n.type.slice(1)} Notice`
      : "Placement Announcement");
  const message = n.message || n.text || "";
  const text =
    n.text ||
    (n.title && n.message
      ? `${n.title} — ${n.message}`
      : n.title || n.message || "");
  const type = (n.type || "announcement").toLowerCase();
  return {
    id: n.id || Date.now() + i,
    title,
    message,
    text,
    date: n.date || "Today",
    type,
    read: Boolean(n.read),
  };
};

const defaultAnnouncements = defaultNotifications.map((n, i) =>
  normalizeNotification(n, i)
);

const load = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (key === "announcements" && Array.isArray(parsed)) {
      if (parsed.length === 0) return fallback;
      return parsed.map((n, i) => normalizeNotification(n, i));
    }
    return parsed;
  } catch {
    return fallback;
  }
};

export function DataProvider({ children }) {
  const [drives, setDrives] = useState(() => load("drives", defaultDrives));
  const [applications, setApplications] = useState(() => load("applications", []));
  const [announcements, setAnnouncements] = useState(() =>
    load("announcements", defaultAnnouncements)
  );

  useEffect(() => localStorage.setItem("drives", JSON.stringify(drives)), [drives]);
  useEffect(() => localStorage.setItem("applications", JSON.stringify(applications)), [applications]);
  useEffect(() => localStorage.setItem("announcements", JSON.stringify(announcements)), [announcements]);

  const addDrive = (drive) =>
    setDrives([
      ...drives,
      {
        ...drive,
        id: Date.now(),
        skills: typeof drive.skills === "string" ? drive.skills.split(",").map((s) => s.trim()) : drive.skills || [],
      },
    ]);

  const deleteDrive = (id) => setDrives(drives.filter((d) => d.id !== id));

  const applyToDrive = (drive) => {
    if (applications.some((a) => a.driveId === drive.id)) return;
    setApplications([
      ...applications,
      { driveId: drive.id, company: drive.company, role: drive.role, stage: 1 },
    ]);
  };

  const updateStage = (driveId, stage) =>
    setApplications(
      applications.map((a) => (a.driveId === driveId ? { ...a, stage } : a))
    );

  const addAnnouncement = (text, type = "announcement", title = "") => {
    const newNotif = normalizeNotification({
      id: Date.now(),
      title:
        title ||
        (type === "deadline"
          ? "Deadline Alert"
          : type === "interview"
          ? "Interview Update"
          : "Placement Announcement"),
      message: text,
      text: text,
      date: "Just now",
      type,
      read: false,
    });
    setAnnouncements((prev) => [newNotif, ...(prev || [])]);
  };

  const deleteAnnouncement = (id) =>
    setAnnouncements(announcements.filter((a) => a.id !== id));

  const markAsRead = (id) => {
    setAnnouncements((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setAnnouncements((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetNotifications = () => {
    setAnnouncements(defaultAnnouncements);
  };

  return (
    <DataContext.Provider
      value={{
        drives,
        addDrive,
        deleteDrive,
        applications,
        applyToDrive,
        updateStage,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        markAsRead,
        markAllAsRead,
        resetNotifications,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
