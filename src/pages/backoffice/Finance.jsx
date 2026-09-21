import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  branches,
  formatIDR,
  getGoodsReceiptByInvoice,
  getInventoryValuation,
  getPL,
  getPayablesForBranch,
  getWriteOffsForBranch,
} from "../../data/mockData.js";
import Badge from "../../components/Badge.jsx";
import { useBranch } from "../../context/BranchContext.jsx";

function branchName(id) {
  return branches.find((b) => b.id === id)?.name || id;
}

const tabs = [
  { value: "overview", label: "Laba rugi" },
  { value: "valuation", label: "Valuasi persediaan" },
  { value: "payables", label: "Utang pemasok" },
  { value: "writeoffs", label: "Penyusutan" },
];

function StatCard({ label, value, sub, tone }) {
  const toneCls = { default: "text-ink", critical: "text-brick", warning: "text-amber", positive: "text-pine-dark" }[
    tone || "default"
  ];
  return (
    <div className="border border-line bg-panel px-5 py-4">
      <div className="text-xs text-muted">{label}</div>
      <div className={`mt-1 font-mono text-2xl tabular ${toneCls}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </div>
  );
}

function Overview({ branchId }) {
  const pl = getPL(branchId);
  const grossMargin = pl.revenue - pl.cogs;
  const netProfit = grossMargin - pl.opex;
  const grossMarginPct = ((grossMargin / pl.revenue) * 100).toFixed(1);
  const netMarginPct = ((netProfit / pl.revenue) * 100).toFixed(1);
  const expectedTotal = pl.cashSales + pl.cardSales;
  const reconciled = Math.abs(expectedTotal - pl.revenue) < 1;

  const rows = [
    { label: "Pendapatan", value: pl.revenue },
    { label: "Harga pokok penjualan (rata-rata tertimbang)", value: -pl.cogs },
    { label: "Margin kotor", value: grossMargin, strong: true },
    { label: "Beban operasional", value: -pl.opex },
    { label: "Laba bersih", value: netProfit, strong: true },
  ];

  return (
    <div>
      <div className="mb-6 grid grid-cols-4 gap-3">
        <StatCard label="Pendapatan" value={formatIDR(pl.revenue)} sub="bulan berjalan" />
        <StatCard label="Margin kotor" value={`${grossMarginPct}%`} sub={formatIDR(grossMargin)} tone="positive" />
        <StatCard label="Laba bersih" value={`${netMarginPct}%`} sub={formatIDR(netProfit)} tone="positive" />
        <StatCard
          label="Rekonsiliasi kas/kartu"
          value={reconciled ? "Sesuai" : "Selisih"}
          sub={formatIDR(expectedTotal)}
          tone={reconciled ? "default" : "critical"}
        />
      </div>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-line last:border-0">
                <td className={`px-4 py-3 ${r.strong ? "font-medium text-ink" : "text-muted"}`}>{r.label}</td>
                <td
                  className={`px-4 py-3 text-right font-mono tabular ${
                    r.strong ? "font-medium text-ink" : r.value < 0 ? "text-brick" : "text-ink"
                  }`}
                >
                  {r.value < 0 ? "−" : ""}
                  {formatIDR(Math.abs(r.value))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted">
        HPP dihitung dari biaya rata-rata tertimbang per SKU per cabang, diperbarui setiap ada penerimaan barang baru
        &mdash; bukan dari biaya batch FEFO yang sedang dipilih di kasir. Lihat tab &ldquo;Valuasi persediaan&rdquo; untuk rincian
        perhitungan rata-rata.
      </p>
    </div>
  );
}

function Valuation({ branchId }) {
  const rows = useMemo(() => getInventoryValuation(branchId), [branchId]);
  const totalValue = rows.reduce((sum, r) => sum + r.value, 0);

  return (
    <div>
      <div className="mb-4">
        <StatCard label="Total nilai persediaan" value={formatIDR(totalValue)} sub={`${rows.length} SKU aktif`} />
      </div>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Barang</th>
              <th className="px-4 py-3 font-medium text-right">Stok tersedia</th>
              <th className="px-4 py-3 font-medium text-right">Biaya rata-rata</th>
              <th className="px-4 py-3 font-medium text-right">Nilai persediaan</th>
              <th className="px-4 py-3 font-medium">Riwayat penerimaan</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.sku} className="border-b border-line last:border-0 hover:bg-line/20">
                <td className="px-4 py-3">
                  <div className="text-ink">{row.name}</div>
                  <div className="font-mono text-xs text-muted">{row.sku}</div>
                </td>
                <td className="px-4 py-3 text-right font-mono tabular">{row.onHand}</td>
                <td className="px-4 py-3 text-right font-mono tabular">{formatIDR(Math.round(row.avgCost))}</td>
                <td className="px-4 py-3 text-right font-mono tabular text-ink">{formatIDR(row.value)}</td>
                <td className="px-4 py-3 text-xs text-muted">
                  {row.receipts.map((r, i) => (
                    <span key={r.batch}>
                      {i > 0 && " · "}
                      {r.qty}× @ {formatIDR(r.unitCost)}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted">
        Setiap SKU membawa satu biaya rata-rata tertimbang per cabang. Saat penerimaan baru dicatat, sistem menghitung
        ulang: <span className="font-mono">rata-rata baru = (stok lama&times;rata-rata lama + qty diterima&times;biaya diterima) &divide;
        total stok</span>. Pemilihan batch fisik saat penjualan tetap mengikuti FEFO untuk kedaluwarsa &mdash; rata-rata
        ini hanya memengaruhi valuasi/HPP.
      </p>
    </div>
  );
}

function Payables({ branchId, highlightId }) {
  const rows = getPayablesForBranch(branchId);
  const outstanding = rows.filter((r) => r.status !== "paid").reduce((sum, r) => sum + r.amount, 0);
  const [expanded, setExpanded] = useState(highlightId || null);

  useEffect(() => {
    if (!highlightId) return;
    setExpanded(highlightId);
    const row = document.querySelector(`[data-row-id="${highlightId}"]`);
    row?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightId]);

  if (branchId !== "MAIN") {
    return (
      <div className="border border-line bg-panel px-5 py-8 text-center text-sm text-muted">
        Utang pemasok dikelola terpusat di Gudang Utama. Pilih cabang &ldquo;Gudang Utama&rdquo; untuk melihat.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <StatCard label="Total belum dibayar" value={formatIDR(outstanding)} sub={`${rows.length} faktur`} tone="warning" />
      </div>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Pemasok</th>
              <th className="px-4 py-3 font-medium">No. Faktur</th>
              <th className="px-4 py-3 font-medium text-right">Jumlah</th>
              <th className="px-4 py-3 font-medium">Termin</th>
              <th className="px-4 py-3 font-medium">Jatuh tempo</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const receipt = getGoodsReceiptByInvoice(p.id);
              const isExpanded = expanded === p.id;
              const isHighlighted = highlightId === p.id;
              return (
                <Fragment key={p.id}>
                  <tr
                    data-row-id={p.id}
                    onClick={() => setExpanded(isExpanded ? null : p.id)}
                    className={`cursor-pointer border-b border-line last:border-0 hover:bg-line/20 ${
                      isHighlighted ? "bg-amber-light/40" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-ink">
                      {p.supplier}
                      <div className="font-mono text-[11px] text-muted">{p.id}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">{p.invoiceNo}</td>
                    <td className="px-4 py-3 text-right font-mono tabular">{formatIDR(p.amount)}</td>
                    <td className="px-4 py-3 text-xs text-muted">{p.terms}</td>
                    <td className="px-4 py-3 text-xs text-muted">{p.dueDate}</td>
                    <td className="px-4 py-3">
                      <Badge status={p.status} />
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="border-b border-line last:border-0 bg-white">
                      <td colSpan={6} className="px-4 py-4">
                        {receipt ? (
                          <>
                            <table className="w-full border-collapse text-xs">
                              <thead>
                                <tr className="text-left text-muted">
                                  <th className="pb-2 font-medium">Barang</th>
                                  <th className="pb-2 font-medium">Batch</th>
                                  <th className="pb-2 font-medium">Kedaluwarsa</th>
                                  <th className="pb-2 font-medium text-right">Biaya satuan</th>
                                  <th className="pb-2 font-medium text-right">Diterima / Dipesan</th>
                                </tr>
                              </thead>
                              <tbody>
                                {receipt.items.map((it) => (
                                  <tr key={it.sku} className="border-t border-line/60">
                                    <td className="py-2 text-ink">
                                      {it.name}
                                      <div className="font-mono text-[11px] text-muted">{it.sku}</div>
                                    </td>
                                    <td className="py-2 font-mono text-muted">{it.batch}</td>
                                    <td className="py-2 text-muted">{it.expiry}</td>
                                    <td className="py-2 text-right font-mono tabular">{formatIDR(it.unitCost)}</td>
                                    <td
                                      className={`py-2 text-right font-mono tabular ${
                                        it.qtyReceived < it.qtyOrdered ? "text-amber" : "text-ink"
                                      }`}
                                    >
                                      {it.qtyReceived}/{it.qtyOrdered}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <p className="mt-3 text-xs text-muted">
                              Diterima melalui{" "}
                              <Link
                                to={`/backoffice/receiving?highlight=${receipt.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="font-mono font-medium text-pine-dark underline decoration-pine-light/50 underline-offset-2 hover:text-pine"
                              >
                                {receipt.id} &middot; {receipt.poNumber}
                              </Link>{" "}
                              di Penerimaan barang.
                            </p>
                          </>
                        ) : (
                          <p className="text-xs text-muted">
                            Tidak ada catatan penerimaan barang yang tertaut untuk faktur ini.
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WriteOffs({ branchId }) {
  const rows = getWriteOffsForBranch(branchId);
  const totalImpact = rows.reduce((sum, r) => sum + r.costImpact, 0);

  return (
    <div>
      <div className="mb-4">
        <StatCard
          label="Dampak biaya penyusutan"
          value={formatIDR(totalImpact)}
          sub={`${rows.length} write-off · mengalir ke beban penyusutan`}
          tone="critical"
        />
      </div>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Barang</th>
              <th className="px-4 py-3 font-medium">Cabang</th>
              <th className="px-4 py-3 font-medium text-right">Qty</th>
              <th className="px-4 py-3 font-medium text-right">Dampak biaya</th>
              <th className="px-4 py-3 font-medium">Alasan</th>
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Disetujui oleh</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((w) => (
              <tr key={w.id} className="border-b border-line last:border-0 hover:bg-line/20">
                <td className="px-4 py-3">
                  <div className="text-ink">{w.name}</div>
                  <div className="font-mono text-xs text-muted">{w.sku}</div>
                </td>
                <td className="px-4 py-3 text-muted">{branchName(w.branch)}</td>
                <td className="px-4 py-3 text-right font-mono tabular">{w.qty}</td>
                <td className="px-4 py-3 text-right font-mono tabular text-brick">{formatIDR(w.costImpact)}</td>
                <td className="px-4 py-3 text-xs text-muted">{w.reason}</td>
                <td className="px-4 py-3 text-xs text-muted">{w.date}</td>
                <td className="px-4 py-3 text-xs text-muted">{w.approvedBy}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-muted">
                  Tidak ada write-off untuk cabang ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted">
        Dampak biaya dihitung dari qty write-off &times; biaya rata-rata tertimbang SKU pada saat penghapusan, dan
        diposting otomatis ke akun beban/penyusutan dari event write-off inventaris.
      </p>
    </div>
  );
}

export default function Finance() {
  const { branchId } = useBranch();
  const [searchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const [tab, setTab] = useState(tabs.some((t) => t.value === requestedTab) ? requestedTab : "overview");
  const highlightId = searchParams.get("highlight");
  const branch = branches.find((b) => b.id === branchId);

  useEffect(() => {
    if (tabs.some((t) => t.value === requestedTab)) setTab(requestedTab);
  }, [requestedTab]);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">Keuangan &amp; Akuntansi</h1>
        <p className="mt-1 text-sm text-muted">
          {branchId === "MAIN" ? "Konsolidasi seluruh cabang" : branch?.name || branchId} &middot; per 21 Sep 2026
        </p>
      </header>

      <div className="mb-6 flex gap-1 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`border-b-2 px-3 py-2 text-sm ${
              tab === t.value
                ? "border-pine font-medium text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && <Overview branchId={branchId} />}
      {tab === "valuation" && <Valuation branchId={branchId} />}
      {tab === "payables" && <Payables branchId={branchId} highlightId={tab === "payables" ? highlightId : null} />}
      {tab === "writeoffs" && <WriteOffs branchId={branchId} />}
    </div>
  );
}
