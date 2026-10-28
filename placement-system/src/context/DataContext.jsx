import { createContext, useContext, useState, useEffect } from "react";
import { opportunities as defaultDrives } from "../data/opportunitiesData";

const DataContext = createContext();

const load = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export function DataProvider({ children }) {
  const [drives, setDrives] = useState(() => load("drives", defaultDrives));
  const [applications, setApplications] = useState(() => load("applications", []));

  useEffect(() => localStorage.setItem("drives", JSON.stringify(drives)), [drives]);
  useEffect(() => localStorage.setItem("applications", JSON.stringify(applications)), [applications]);

  const addDrive = (drive) =>
    setDrives([...drives, { ...drive, id: Date.now(), skills: drive.skills.split(",").map(s => s.trim()) }]);

  const deleteDrive = (id) => setDrives(drives.filter((d) => d.id !== id));

  const applyToDrive = (drive) => {
    if (applications.some((a) => a.driveId === drive.id)) return;
    setApplications([...applications, { driveId: drive.id, company: drive.company, role: drive.role, stage: 1 }]);
  };

  const updateStage = (driveId, stage) =>
    setApplications(applications.map((a) => (a.driveId === driveId ? { ...a, stage } : a)));

  return (
    <DataContext.Provider value={{ drives, addDrive, deleteDrive, applications, applyToDrive, updateStage }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
