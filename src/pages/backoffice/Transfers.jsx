import { transfers, branches } from "../../data/mockData.js";
import Badge from "../../components/Badge.jsx";

function branchName(id) {
  return branches.find((b) => b.id === id)?.name || id;
}

export default function Transfers() {
  return (
    <div>
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Transfers</h1>
          <p className="mt-1 text-sm text-muted">Main Warehouse \u2192 branch movement, in order of last activity</p>
        </div>
        <button className="border border-pine bg-pine px-4 py-2 text-sm font-medium text-white hover:bg-pine-dark">
          New transfer
        </button>
      </header>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Transfer</th>
              <th className="px-4 py-3 font-medium">From</th>
              <th className="px-4 py-3 font-medium">To</th>
              <th className="px-4 py-3 font-medium text-right">Items</th>
              <th className="px-4 py-3 font-medium text-right">Units</th>
              <th className="px-4 py-3 font-medium">Requested</th>
              <th className="px-4 py-3 font-medium">ETA</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => (
              <tr key={t.id} className="border-b border-line last:border-0 hover:bg-line/20">
                <td className="px-4 py-3 font-mono text-xs text-ink">{t.id}</td>
                <td className="px-4 py-3 text-muted">{branchName(t.from)}</td>
                <td className="px-4 py-3 text-ink">{branchName(t.to)}</td>
                <td className="px-4 py-3 text-right font-mono tabular">{t.items}</td>
                <td className="px-4 py-3 text-right font-mono tabular">{t.units}</td>
                <td className="px-4 py-3 text-xs text-muted">{t.requested}</td>
                <td className="px-4 py-3 text-xs text-muted">{t.eta}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Badge status={t.status} />
                    {typeof t.variance === "number" && t.variance !== 0 && (
                      <span className="text-xs text-brick">
                        {t.variance > 0 ? "+" : ""}
                        {t.variance} variance
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted">
        TRF-2085 shows a &minus;6 unit variance between dispatched and received quantity, flagged for review at Renon
        Branch.
      </p>
    </div>
  );
}
