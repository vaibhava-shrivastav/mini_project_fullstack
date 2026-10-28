import { stages } from "../data/studentData";

export default function TrackerBar({ stage }) {
  return (
    <div className="tracker-bar">
      {stages.map((s, i) => (
        <span key={s} className={i <= stage ? "step active" : "step"}>{s}</span>
      ))}
    </div>
  );
}