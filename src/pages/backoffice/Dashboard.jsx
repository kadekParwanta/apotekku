import { useMemo, useState } from "react";
import { branches, getStockForBranch } from "../../data/mockData.js";
import Badge from "../../components/Badge.jsx";
import { useBranch } from "../../context/BranchContext.jsx";

const statusOptions = [
  { value: "all", label: "Semua status" },
  { value: "critical", label: "Kritis" },
  { value: "below-min", label: "Di bawah minimum" },
  { value: "near-expiry", label: "Mendekati kedaluwarsa" },
  { value: "ok", label: "Sesuai batas" },
];

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
  const { branchId } = useBranch();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const branch = branches.find((b) => b.id === branchId);
  const stockSnapshot = getStockForBranch(branchId);

  const belowMin = stockSnapshot.filter((s) => s.status === "critical" || s.status === "below-min").length;
  const nearExpiry = stockSnapshot.filter((s) => s.status === "near-expiry").length;
  const inTransitUnits = stockSnapshot.reduce((sum, s) => sum + s.inTransit, 0);

  const filteredStock = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stockSnapshot.filter((row) => {
      const matchesQuery = !q || row.name.toLowerCase().includes(q) || row.sku.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [stockSnapshot, query, statusFilter]);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">Ringkasan stok</h1>
        <p className="mt-1 text-sm text-muted">
          {branch ? branch.name : branchId} \u00b7 per 19 Sep 2026, 09:12
        </p>
      </header>

      <div className="mb-8 grid grid-cols-4 gap-3">
        <StatCard label="SKU di bawah minimum" value={belowMin} tone="critical" sub="perlu diisi ulang" />
        <StatCard label="Batch mendekati kedaluwarsa" value={nearExpiry} tone="warning" sub="dalam 60 hari" />
        <StatCard label="Unit dalam perjalanan" value={inTransitUnits} sub="masuk dari Gudang Utama" />
        <StatCard label="SKU aktif" value={stockSnapshot.length} sub="dipantau di cabang ini" />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari SKU atau nama barang"
          className="w-64 rounded border border-line bg-white px-3 py-1.5 text-sm text-ink placeholder:text-muted focus-visible:outline-2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded border border-line bg-white px-2.5 py-1.5 text-sm text-ink focus-visible:outline-2"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {(query || statusFilter !== "all") && (
          <button
            onClick={() => {
              setQuery("");
              setStatusFilter("all");
            }}
            className="text-xs text-muted hover:text-pine"
          >
            Hapus filter
          </button>
        )}
        <span className="ml-auto text-xs text-muted">
          {filteredStock.length} dari {stockSnapshot.length} SKU
        </span>
      </div>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Barang</th>
              <th className="px-4 py-3 font-medium text-right">Stok tersedia</th>
              <th className="px-4 py-3 font-medium text-right">Dalam perjalanan</th>
              <th className="px-4 py-3 font-medium text-right">Min / Maks</th>
              <th className="px-4 py-3 font-medium">Batch</th>
              <th className="px-4 py-3 font-medium">Kedaluwarsa</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((row) => (
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
            {filteredStock.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-muted">
                  Tidak ada SKU yang cocok dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
