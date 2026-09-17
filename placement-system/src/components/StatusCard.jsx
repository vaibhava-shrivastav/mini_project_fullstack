export default function StatusCard({ title, value }) {
  return (
    <div className="status-card">
      <p className="status-title">{title}</p>
      <p className="status-value">{value}</p>
    </div>
  );
}