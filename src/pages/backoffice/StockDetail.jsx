import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  branches,
  formatIDR,
  getAverageCost,
  getStockBatches,
  getStockForBranch,
  getStockMovements,
  movementTypes,
  posCatalog,
} from "../../data/mockData.js";
import Badge from "../../components/Badge.jsx";
import { useBranch } from "../../context/BranchContext.jsx";

const typeOptions = [{ value: "all", label: "Semua jenis" }, ...movementTypes.map((t) => ({ value: t.value, label: t.label }))];

function StatCard({ label, value, sub, tone, onClick }) {
  const toneCls = {
    default: "text-ink",
    critical: "text-brick",
    warning: "text-amber",
    positive: "text-pine-dark",
  }[tone || "default"];
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`border border-line bg-panel px-5 py-4 text-left ${
        onClick ? "cursor-pointer transition-colors hover:border-pine hover:bg-line/20" : ""
      }`}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className={`mt-1 font-mono text-2xl tabular ${toneCls}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </Tag>
  );
}

export default function StockDetail() {
  const { sku } = useParams();
  const { branchId } = useBranch();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showBatches, setShowBatches] = useState(false);

  const branch = branches.find((b) => b.id === branchId);
  const stock = getStockForBranch(branchId).find((s) => s.sku === sku);
  const catalogEntry = posCatalog.find((p) => p.sku === sku);
  const avgCost = getAverageCost(sku);
  const movements = useMemo(() => getStockMovements(sku, branchId), [sku, branchId]);
  const batches = useMemo(() => getStockBatches(sku, branchId), [sku, branchId]);
  const NEAR_EXPIRY_ANCHOR = new Date("2026-09-19");
  const isNearExpiry = (expiry) => {
    const days = (new Date(expiry) - NEAR_EXPIRY_ANCHOR) / (1000 * 60 * 60 * 24);
    return days <= 90;
  };

  const filteredMovements = useMemo(() => {
    const q = query.trim().toLowerCase();
    return movements.filter((m) => {
      const matchesQuery =
        !q || m.reference.toLowerCase().includes(q) || m.note.toLowerCase().includes(q);
      const matchesType = typeFilter === "all" || m.type === typeFilter;
      const matchesFrom = !dateFrom || m.date >= dateFrom;
      const matchesTo = !dateTo || m.date <= dateTo;
      return matchesQuery && matchesType && matchesFrom && matchesTo;
    });
  }, [movements, query, typeFilter, dateFrom, dateTo]);

  const totalIn = filteredMovements.filter((m) => m.qty > 0).reduce((sum, m) => sum + m.qty, 0);
  const totalOut = filteredMovements.filter((m) => m.qty < 0).reduce((sum, m) => sum + m.qty, 0);

  const hasFilters = query || typeFilter !== "all" || dateFrom || dateTo;
  const clearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  if (!stock) {
    return (
      <div>
        <Link to="/backoffice" className="text-xs text-muted hover:text-pine">
          ← Kembali ke ringkasan stok
        </Link>
        <p className="mt-6 text-sm text-muted">
          SKU &ldquo;{sku}&rdquo; tidak ditemukan di {branch ? branch.name : branchId}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/backoffice" className="text-xs text-muted hover:text-pine">
        ← Kembali ke ringkasan stok
      </Link>

      <header className="mb-6 mt-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-ink">{stock.name}</h1>
            {stock.rx && <span className="text-sm text-brick">Rx</span>}
            <Badge status={stock.status} />
          </div>
          <p className="mt-1 text-sm text-muted">
            {stock.form} · <span className="font-mono">{stock.sku}</span> · {branch ? branch.name : branchId}
          </p>
        </div>
      </header>

      <div className="mb-8 grid grid-cols-4 gap-3">
        <StatCard label="Stok tersedia" value={stock.onHand} sub={`min ${stock.min} / maks ${stock.max}`} />
        <StatCard label="Dalam perjalanan" value={stock.inTransit || 0} />
        <StatCard
          label="Batch aktif"
          value={stock.batch}
          sub={`kedaluwarsa ${stock.expiry} · ${batches.length} batch tersedia`}
          onClick={() => setShowBatches(true)}
        />
        <StatCard
          label="Nilai persediaan"
          value={formatIDR(Math.round(avgCost * stock.onHand))}
          sub={`avg cost ${formatIDR(Math.round(avgCost))}${catalogEntry ? ` · jual ${formatIDR(catalogEntry.price)}` : ""}`}
        />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-ink">Riwayat transaksi</h2>
        <div className="flex gap-4 text-xs text-muted">
          <span>
            Masuk <span className="font-mono text-pine-dark">+{totalIn}</span>
          </span>
          <span>
            Keluar <span className="font-mono text-brick">{totalOut}</span>
          </span>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari referensi atau catatan"
          className="w-56 rounded border border-line bg-white px-3 py-1.5 text-sm text-ink placeholder:text-muted focus-visible:outline-2"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded border border-line bg-white px-2.5 py-1.5 text-sm text-ink focus-visible:outline-2"
        >
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="rounded border border-line bg-white px-2.5 py-1.5 text-sm text-ink focus-visible:outline-2"
        />
        <span className="text-xs text-muted">s/d</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="rounded border border-line bg-white px-2.5 py-1.5 text-sm text-ink focus-visible:outline-2"
        />
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-muted hover:text-pine">
            Hapus filter
          </button>
        )}
        <span className="ml-auto text-xs text-muted">
          {filteredMovements.length} dari {movements.length} transaksi
        </span>
      </div>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Jenis</th>
              <th className="px-4 py-3 font-medium text-right">Perubahan</th>
              <th className="px-4 py-3 font-medium text-right">Saldo</th>
              <th className="px-4 py-3 font-medium">Referensi</th>
              <th className="px-4 py-3 font-medium">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovements.map((m) => (
              <tr key={m.id} className="border-b border-line last:border-0 hover:bg-line/20">
                <td className="px-4 py-3 text-xs text-muted">{m.date}</td>
                <td className="px-4 py-3">
                  <Badge status={m.type} />
                </td>
                <td className={`px-4 py-3 text-right font-mono tabular ${m.qty > 0 ? "text-pine-dark" : "text-brick"}`}>
                  {m.qty > 0 ? "+" : ""}
                  {m.qty}
                </td>
                <td className="px-4 py-3 text-right font-mono tabular">{m.balanceAfter}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted">{m.reference}</td>
                <td className="px-4 py-3 text-xs text-muted">{m.note}</td>
              </tr>
            ))}
            {filteredMovements.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted">
                  Tidak ada transaksi yang cocok dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showBatches && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowBatches(false)}
        >
          <div
            className="w-full max-w-lg border border-line bg-white px-6 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-ink">Batch di lokasi</h3>
                <p className="mt-0.5 text-sm text-muted">
                  {stock.name} · {branch ? branch.name : branchId}
                </p>
              </div>
              <button
                onClick={() => setShowBatches(false)}
                className="text-xs text-muted hover:text-pine"
              >
                Tutup
              </button>
            </div>

            <div className="mt-4 border border-line">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs text-muted">
                    <th className="px-3 py-2 font-medium">Batch</th>
                    <th className="px-3 py-2 font-medium">Diterima</th>
                    <th className="px-3 py-2 font-medium">Kedaluwarsa</th>
                    <th className="px-3 py-2 text-right font-medium">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((b) => (
                    <tr key={b.batch} className="border-b border-line last:border-0">
                      <td className="px-3 py-2 font-mono text-xs text-ink">{b.batch}</td>
                      <td className="px-3 py-2 text-xs text-muted">{b.receivedAt || "-"}</td>
                      <td className="px-3 py-2">
                        {isNearExpiry(b.expiry) ? (
                          <Badge status="near-expiry">{b.expiry}</Badge>
                        ) : (
                          <span className="text-xs text-muted">{b.expiry}</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-right font-mono tabular">{b.qty}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-line text-xs">
                    <td colSpan={3} className="px-3 py-2 font-medium text-muted">
                      Total stok tersedia
                    </td>
                    <td className="px-3 py-2 text-right font-mono font-medium tabular text-ink">
                      {batches.reduce((sum, b) => sum + b.qty, 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
