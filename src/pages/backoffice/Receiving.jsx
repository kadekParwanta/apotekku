import { Fragment, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { formatIDR, getPayableById, getReceiptsForBranch } from "../../data/mockData.js";
import Badge from "../../components/Badge.jsx";
import { useBranch } from "../../context/BranchContext.jsx";

function StatCard({ label, value, sub, tone }) {
  const toneCls = { default: "text-ink", critical: "text-brick", warning: "text-amber" }[tone || "default"];
  return (
    <div className="border border-line bg-panel px-5 py-4">
      <div className="text-xs text-muted">{label}</div>
      <div className={`mt-1 font-mono text-2xl tabular ${toneCls}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </div>
  );
}

function unitsOf(receipt, field) {
  return receipt.items.reduce((sum, i) => sum + i[field], 0);
}

export default function Receiving() {
  const { branchId } = useBranch();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");
  const [expanded, setExpanded] = useState(highlightId || null);
  const receipts = getReceiptsForBranch(branchId);

  useEffect(() => {
    if (!highlightId) return;
    const row = document.querySelector(`[data-row-id="${highlightId}"]`);
    row?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightId]);

  if (branchId !== "MAIN") {
    return (
      <div>
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-ink">Penerimaan barang</h1>
          <p className="mt-1 text-sm text-muted">Penerimaan dari pemasok di Gudang Utama</p>
        </header>
        <div className="border border-line bg-panel px-5 py-8 text-center text-sm text-muted">
          Penerimaan barang dari pemasok hanya dilakukan di Gudang Utama. Pilih cabang &ldquo;Gudang Utama&rdquo;
          untuk melihat.
        </div>
      </div>
    );
  }

  const openPOs = receipts.filter((r) => r.status !== "received").length;
  const unitsReceivedTotal = receipts.reduce((sum, r) => sum + unitsOf(r, "qtyReceived"), 0);
  const unitsOutstanding = receipts.reduce((sum, r) => sum + (unitsOf(r, "qtyOrdered") - unitsOf(r, "qtyReceived")), 0);

  return (
    <div>
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Penerimaan barang</h1>
          <p className="mt-1 text-sm text-muted">
            Penerimaan dari pemasok di Gudang Utama, dicatat terhadap PO &mdash; mendukung penerimaan sebagian
            lintas beberapa pengiriman.
          </p>
        </div>
        <button className="border border-pine bg-pine px-4 py-2 text-sm font-medium text-white hover:bg-pine-dark">
          Terima barang baru
        </button>
      </header>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatCard label="PO menunggu / sebagian" value={openPOs} tone={openPOs > 0 ? "warning" : "default"} />
        <StatCard label="Unit diterima" value={unitsReceivedTotal.toLocaleString("id-ID")} sub="seluruh GRN" />
        <StatCard
          label="Unit belum diterima"
          value={unitsOutstanding.toLocaleString("id-ID")}
          sub="dari PO yang masih terbuka"
          tone={unitsOutstanding > 0 ? "warning" : "default"}
        />
      </div>

      <div className="border border-line bg-panel">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">GRN</th>
              <th className="px-4 py-3 font-medium">No. PO</th>
              <th className="px-4 py-3 font-medium">Pemasok</th>
              <th className="px-4 py-3 font-medium text-right">Item</th>
              <th className="px-4 py-3 font-medium text-right">Diterima / Dipesan</th>
              <th className="px-4 py-3 font-medium">Dipesan</th>
              <th className="px-4 py-3 font-medium">Diterima</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((r) => {
              const ordered = unitsOf(r, "qtyOrdered");
              const received = unitsOf(r, "qtyReceived");
              const isExpanded = expanded === r.id;
              const isHighlighted = highlightId === r.id;
              return (
                <Fragment key={r.id}>
                  <tr
                    data-row-id={r.id}
                    onClick={() => setExpanded(isExpanded ? null : r.id)}
                    className={`cursor-pointer border-b border-line last:border-0 hover:bg-line/20 ${
                      isHighlighted ? "bg-amber-light/40" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-ink">{r.id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">{r.poNumber}</td>
                    <td className="px-4 py-3 text-ink">
                      {r.supplier}
                      {r.invoiceRef && (
                        <div className="font-mono text-[11px] text-muted">
                          Faktur: {getPayableById(r.invoiceRef)?.invoiceNo || r.invoiceRef}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular">{r.items.length}</td>
                    <td className="px-4 py-3 text-right font-mono tabular">
                      {received}/{ordered}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{r.orderedDate}</td>
                    <td className="px-4 py-3 text-xs text-muted">{r.receivedDate || "—"}</td>
                    <td className="px-4 py-3">
                      <Badge status={r.status} />
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="border-b border-line last:border-0 bg-white">
                      <td colSpan={8} className="px-4 py-4">
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
                            {r.items.map((it) => (
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
                        {r.invoiceRef ? (
                          (() => {
                            const invoice = getPayableById(r.invoiceRef);
                            return (
                              <p className="mt-3 text-xs text-muted">
                                Terhubung ke faktur pemasok{" "}
                                <Link
                                  to={`/backoffice/finance?tab=payables&highlight=${r.invoiceRef}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="font-mono font-medium text-pine-dark underline decoration-pine-light/50 underline-offset-2 hover:text-pine"
                                >
                                  {r.invoiceRef}
                                  {invoice ? ` · ${invoice.invoiceNo}` : ""}
                                </Link>{" "}
                                di Keuangan &rarr; Utang pemasok.
                              </p>
                            );
                          })()
                        ) : (
                          <p className="mt-3 text-xs text-muted">
                            Belum ada faktur pemasok tercatat &mdash; menunggu penerimaan lengkap.
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {receipts.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-muted">
                  Belum ada penerimaan barang.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
