import { NavLink } from "react-router-dom";
import { branches } from "../data/mockData.js";

const nav = [
  { to: "/backoffice", label: "Ringkasan stok", end: true },
  { to: "/backoffice/transfers", label: "Transfer" },
  { to: "/backoffice/replenishment", label: "Pengisian ulang" },
  { to: "/backoffice/forecasting", label: "Peramalan" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-line bg-panel">
      <div className="border-b border-line px-5 py-5">
        <div className="font-mono text-[13px] tracking-tight text-muted">Farmasi</div>
        <div className="text-lg font-semibold leading-tight text-ink">Back Office</div>
      </div>

      <div className="border-b border-line px-5 py-4">
        <label className="block text-xs text-muted mb-1.5" htmlFor="branch-select">
          Cabang
        </label>
        <select
          id="branch-select"
          defaultValue="BR-01"
          className="w-full rounded border border-line bg-white px-2.5 py-1.5 text-sm text-ink focus-visible:outline-2"
        >
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-0.5">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block rounded px-3 py-2 text-sm ${
                    isActive
                      ? "bg-pine text-white font-medium"
                      : "text-ink/80 hover:bg-line/40"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-line px-5 py-4">
        <NavLink to="/" className="text-xs text-muted hover:text-pine">
          ← Beralih ke POS
        </NavLink>
      </div>
    </aside>
  );
}
