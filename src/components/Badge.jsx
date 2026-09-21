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
  outstanding: "bg-amber-light text-amber border-amber/30",
  overdue: "bg-brick-light text-brick border-brick/30",
  paid: "bg-pine-light/10 text-pine-dark border-pine-light/30",
};

const labels = {
  ok: "Sesuai batas",
  "below-min": "Di bawah minimum",
  critical: "Kritis",
  "near-expiry": "Mendekati kedaluwarsa",
  warning: "Perlu ditinjau",
  "in-transit": "Dalam perjalanan",
  dispatched: "Dikirim",
  delivered: "Terkirim",
  "pending-approval": "Menunggu persetujuan",
  outstanding: "Belum dibayar",
  overdue: "Jatuh tempo",
  paid: "Lunas",
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
