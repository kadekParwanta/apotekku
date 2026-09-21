import { forecastAtRisk, branches } from "../../data/mockData.js";

function branchName(id) {
  return branches.find((b) => b.id === id)?.name || id;
}

function Sparkbars({ base, current }) {
  const max = Math.max(base, current) * 1.15;
  return (
    <div className="flex h-8 items-end gap-1">
      <div className="w-2.5 bg-line" style={{ height: `${(base / max) * 100}%` }} title="28-day average" />
      <div className="w-2.5 bg-amber" style={{ height: `${(current / max) * 100}%` }} title="last 7 days" />
    </div>
  );
}

export default function Forecasting() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">Fast-moving stock</h1>
        <p className="mt-1 text-sm text-muted">
          7-day sales velocity vs. 28-day rolling average, flagged when a SKU moves more than 2&sigma; above trend.
        </p>
      </header>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Branch</th>
              <th className="px-4 py-3 font-medium text-right">7d avg / day</th>
              <th className="px-4 py-3 font-medium text-right">28d avg / day</th>
              <th className="px-4 py-3 font-medium">Trend</th>
              <th className="px-4 py-3 font-medium text-right">Change</th>
              <th className="px-4 py-3 font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {forecastAtRisk.map((row) => (
              <tr key={row.sku + row.branch} className="border-b border-line last:border-0 hover:bg-line/20">
                <td className="px-4 py-3">
                  <div className="text-ink">{row.name}</div>
                  <div className="font-mono text-xs text-muted">{row.sku}</div>
                </td>
                <td className="px-4 py-3 text-muted">{branchName(row.branch)}</td>
                <td className="px-4 py-3 text-right font-mono tabular">{row.velocity7d.toFixed(1)}</td>
                <td className="px-4 py-3 text-right font-mono tabular text-muted">
                  {row.velocity28dAvg.toFixed(1)}
                </td>
                <td className="px-4 py-3">
                  <Sparkbars base={row.velocity28dAvg} current={row.velocity7d} />
                </td>
                <td className="px-4 py-3 text-right font-mono tabular text-amber">{row.change}</td>
                <td className="px-4 py-3 text-xs text-muted">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 bg-line" /> 28-day average
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 bg-amber" /> Last 7 days
        </span>
      </div>
    </div>
  );
}
