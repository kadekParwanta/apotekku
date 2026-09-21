import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <div className="font-mono text-xs tracking-tight text-muted">Farmasi &middot; mockup</div>
          <h1 className="mt-1 text-2xl font-semibold text-ink">Pharmacy operations system</h1>
          <p className="mt-2 text-sm text-muted">
            Two separate applications, one shared backend. Pick a surface to preview.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/backoffice"
            className="group border border-line bg-panel px-6 py-8 text-left transition-colors hover:border-pine"
          >
            <div className="text-xs text-muted">Web app</div>
            <div className="mt-1 text-lg font-semibold text-ink group-hover:text-pine">Back Office</div>
            <p className="mt-2 text-sm text-muted">
              Stock overview, inter-branch transfers, replenishment approvals, fast-moving forecasts.
            </p>
          </Link>

          <Link
            to="/pos"
            className="group border border-line bg-ink px-6 py-8 text-left transition-colors hover:border-pine-light"
          >
            <div className="text-xs text-white/40">PWA &middot; counter tablet</div>
            <div className="mt-1 text-lg font-semibold text-white group-hover:text-pine-light">POS</div>
            <p className="mt-2 text-sm text-white/60">
              Sale, prescription verification, cash/card checkout, shift close.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
