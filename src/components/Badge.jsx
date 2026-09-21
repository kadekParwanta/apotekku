const styles = {
  ok: "bg-pine-light/10 text-pine-dark border-pine-light/30",
  "below-min": "bg-amber-light text-amber border-amber/30",
  critical: "bg-brick-light text-brick border-brick/30",
  "near-expiry": "bg-amber-light text-amber border-amber/30",
  warning: "bg-amber-light text-amber border-amber/30",
  "in-transit": "bg-pine-light/10 text-pine-dark border-pine-light/30",
  dispatched: "bg-amber-light text-amber border-amber/30",
  delivered: "bg-pine-light/10 text-pine-dark border-pine-light/30",
  "pending-approval": "bg-brick-light text-brick border-brick/30",
};

const labels = {
  ok: "In range",
  "below-min": "Below min",
  critical: "Critical",
  "near-expiry": "Near expiry",
  warning: "Needs review",
  "in-transit": "In transit",
  dispatched: "Dispatched",
  delivered: "Delivered",
  "pending-approval": "Pending approval",
};

export default function Badge({ status, children }) {
  const cls = styles[status] || "bg-line/40 text-muted border-line";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-medium ${cls}`}
    >
      {children || labels[status] || status}
    </span>
  );
}
