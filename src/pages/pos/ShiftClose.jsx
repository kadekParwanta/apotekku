import { shiftSummary, formatIDR } from "../../data/mockData.js";

export default function ShiftClose() {
  const s = shiftSummary;
  const expectedTotal = s.cashSales - s.refunds;
  const diff = s.countedCashDrawer - s.expectedCashDrawer;

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto p-6">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-semibold text-white">Tutup shift</h1>
        <p className="mt-1 text-sm text-white/50">
          {s.cashier} &middot; {s.branch} &middot; {s.opened} &ndash; {s.closing}
        </p>

        <div className="mt-6 space-y-0.5">
          <Row label="Transaksi" value={s.transactions} />
          <Row label="Penjualan tunai" value={formatIDR(s.cashSales)} />
          <Row label="Penjualan kartu" value={formatIDR(s.cardSales)} />
          <Row label="Pengembalian dana" value={"− " + formatIDR(s.refunds)} muted />
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <h2 className="text-xs font-medium uppercase tracking-wide text-white/40">Rekonsiliasi laci kas</h2>
          <div className="mt-2 space-y-0.5">
            <Row label="Perkiraan di laci" value={formatIDR(s.expectedCashDrawer)} />
            <Row label="Hasil hitung di laci" value={formatIDR(s.countedCashDrawer)} />
          </div>
          <div
            className={`mt-3 flex items-center justify-between border px-4 py-2.5 text-sm ${
              diff === 0
                ? "border-pine-light/40 bg-pine-light/10 text-pine-light"
                : "border-brick/40 bg-brick/10 text-brick"
            }`}
          >
            <span>{diff === 0 ? "Laci seimbang" : "Terdapat varians"}</span>
            <span className="font-mono tabular">
              {diff === 0 ? "Rp 0" : (diff > 0 ? "+" : "") + formatIDR(diff)}
            </span>
          </div>
        </div>

        <button className="mt-6 w-full bg-white py-3 text-sm font-semibold text-ink hover:bg-white/90">
          Konfirmasi dan tutup shift
        </button>
        <p className="mt-2 text-center text-xs text-white/30">
          Menutup shift akan membuat laporan shift dan mengunci akses POS hingga masuk berikutnya.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-white/60">{label}</span>
      <span className={`font-mono tabular ${muted ? "text-white/50" : "text-white"}`}>{value}</span>
    </div>
  );
}
