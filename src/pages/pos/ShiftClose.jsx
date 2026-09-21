import { shiftSummary, formatIDR } from "../../data/mockData.js";

export default function ShiftClose() {
  const s = shiftSummary;
  const expectedTotal = s.cashSales - s.refunds;
  const diff = s.countedCashDrawer - s.expectedCashDrawer;

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto p-6">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-semibold text-white">Close shift</h1>
        <p className="mt-1 text-sm text-white/50">
          {s.cashier} &middot; {s.branch} &middot; {s.opened} &ndash; {s.closing}
        </p>

        <div className="mt-6 space-y-0.5">
          <Row label="Transactions" value={s.transactions} />
          <Row label="Cash sales" value={formatIDR(s.cashSales)} />
          <Row label="Card sales" value={formatIDR(s.cardSales)} />
          <Row label="Refunds" value={"− " + formatIDR(s.refunds)} muted />
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <h2 className="text-xs font-medium uppercase tracking-wide text-white/40">Cash drawer reconciliation</h2>
          <div className="mt-2 space-y-0.5">
            <Row label="Expected in drawer" value={formatIDR(s.expectedCashDrawer)} />
            <Row label="Counted in drawer" value={formatIDR(s.countedCashDrawer)} />
          </div>
          <div
            className={`mt-3 flex items-center justify-between border px-4 py-2.5 text-sm ${
              diff === 0
                ? "border-pine-light/40 bg-pine-light/10 text-pine-light"
                : "border-brick/40 bg-brick/10 text-brick"
            }`}
          >
            <span>{diff === 0 ? "Drawer balances" : "Variance detected"}</span>
            <span className="font-mono tabular">
              {diff === 0 ? "Rp 0" : (diff > 0 ? "+" : "") + formatIDR(diff)}
            </span>
          </div>
        </div>

        <button className="mt-6 w-full bg-white py-3 text-sm font-semibold text-ink hover:bg-white/90">
          Confirm and close shift
        </button>
        <p className="mt-2 text-center text-xs text-white/30">
          Closing generates a shift report and locks POS access until the next sign-in.
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
