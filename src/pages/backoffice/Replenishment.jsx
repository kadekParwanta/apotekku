import { useState } from "react";
import { replenishmentQueue, branches } from "../../data/mockData.js";
import Badge from "../../components/Badge.jsx";

function branchName(id) {
  return branches.find((b) => b.id === id)?.name || id;
}

export default function Replenishment() {
  const [decisions, setDecisions] = useState({});

  const decide = (id, value) => setDecisions((d) => ({ ...d, [id]: value }));

  const pending = replenishmentQueue.filter((r) => !decisions[r.id]);
  const resolved = replenishmentQueue.filter((r) => decisions[r.id]);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">Replenishment approvals</h1>
        <p className="mt-1 text-sm text-muted">
          Every suggestion requires manual sign-off before dispatch &mdash; nothing here auto-approves.
        </p>
      </header>

      <div className="space-y-3">
        {pending.map((r) => (
          <div key={r.id} className="border border-line bg-panel px-5 py-4">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted">{r.id}</span>
                  <Badge status={r.flag}>{r.flag === "critical" ? "Critical" : "Needs review"}</Badge>
                  {r.fastMoving && (
                    <span className="inline-flex items-center gap-1 border border-amber/30 bg-amber-light px-2 py-0.5 text-xs font-medium text-amber">
                      Fast-moving
                    </span>
                  )}
                </div>
                <div className="mt-1.5 text-ink">{r.name}</div>
                <div className="text-xs text-muted">
                  {r.sku} \u00b7 {branchName(r.branch)} \u00b7 {r.reason}
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-xs text-muted">
                  on hand {r.onHand} &middot; min {r.min} / max {r.max}
                </div>
                <div className="mt-1 font-mono text-lg tabular text-ink">+{r.suggestedQty}</div>
                <div className="text-xs text-muted">suggested transfer qty</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 border-t border-line pt-3">
              <button
                onClick={() => decide(r.id, "approved")}
                className="border border-pine bg-pine px-3 py-1.5 text-sm font-medium text-white hover:bg-pine-dark"
              >
                Approve transfer
              </button>
              <button
                onClick={() => decide(r.id, "adjusted")}
                className="border border-line bg-white px-3 py-1.5 text-sm text-ink hover:bg-line/30"
              >
                Adjust quantity
              </button>
              <button
                onClick={() => decide(r.id, "rejected")}
                className="border border-line bg-white px-3 py-1.5 text-sm text-muted hover:bg-line/30"
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {pending.length === 0 && (
          <div className="border border-line bg-panel px-5 py-8 text-center text-sm text-muted">
            Queue is clear. New suggestions appear here as branch stock crosses minimum thresholds.
          </div>
        )}
      </div>

      {resolved.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Reviewed this session</h2>
          <div className="space-y-1.5">
            {resolved.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between border border-line bg-white px-4 py-2 text-sm"
              >
                <span className="text-ink">
                  {r.name} <span className="text-xs text-muted">\u00b7 {branchName(r.branch)}</span>
                </span>
                <span className="text-xs font-medium capitalize text-muted">{decisions[r.id]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
