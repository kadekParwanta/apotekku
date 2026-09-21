import { stockSnapshot } from "../../data/mockData.js";
import Badge from "../../components/Badge.jsx";

function StatCard({ label, value, sub, tone }) {
  const toneCls = {
    default: "text-ink",
    critical: "text-brick",
    warning: "text-amber",
  }[tone || "default"];
  return (
    <div className="border border-line bg-panel px-5 py-4">
      <div className="text-xs text-muted">{label}</div>
      <div className={`mt-1 font-mono text-2xl tabular ${toneCls}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const belowMin = stockSnapshot.filter((s) => s.status === "critical" || s.status === "below-min").length;
  const nearExpiry = stockSnapshot.filter((s) => s.status === "near-expiry").length;
  const inTransitUnits = stockSnapshot.reduce((sum, s) => sum + s.inTransit, 0);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">Stock overview</h1>
        <p className="mt-1 text-sm text-muted">Sanur Branch \u00b7 as of Sep 19, 2026, 09:12</p>
      </header>

      <div className="mb-8 grid grid-cols-4 gap-3">
        <StatCard label="SKUs below minimum" value={belowMin} tone="critical" sub="needs replenishment" />
        <StatCard label="Near-expiry batches" value={nearExpiry} tone="warning" sub="within 60 days" />
        <StatCard label="Units in transit" value={inTransitUnits} sub="incoming from Main Warehouse" />
        <StatCard label="Active SKUs" value={stockSnapshot.length} sub="tracked at this branch" />
      </div>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium text-right">On hand</th>
              <th className="px-4 py-3 font-medium text-right">In transit</th>
              <th className="px-4 py-3 font-medium text-right">Min / Max</th>
              <th className="px-4 py-3 font-medium">Batch</th>
              <th className="px-4 py-3 font-medium">Expiry</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {stockSnapshot.map((row) => (
              <tr key={row.sku} className="border-b border-line last:border-0 hover:bg-line/20">
                <td className="px-4 py-3 font-mono text-xs text-muted">{row.sku}</td>
                <td className="px-4 py-3">
                  <div className="text-ink">{row.name}</div>
                  <div className="text-xs text-muted">
                    {row.form}
                    {row.rx && <span className="ml-1.5 text-brick">Rx</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono tabular">{row.onHand}</td>
                <td className="px-4 py-3 text-right font-mono tabular text-muted">
                  {row.inTransit || "\u2014"}
                </td>
                <td className="px-4 py-3 text-right font-mono tabular text-muted">
                  {row.min} / {row.max}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted">{row.batch}</td>
                <td className="px-4 py-3 text-xs text-muted">{row.expiry}</td>
                <td className="px-4 py-3">
                  <Badge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
