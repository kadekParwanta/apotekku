import { NavLink, Outlet } from "react-router-dom";

export default function PosLayout() {
  return (
    <div className="flex h-screen w-full flex-col bg-ink text-white">
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-pine-dark px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-tight text-white/60">Farmasi POS</span>
          <span className="text-white/30">/</span>
          <span className="text-sm font-medium">Sanur Branch</span>
        </div>
        <nav className="flex items-center gap-1">
          <NavLink
            to="/pos"
            end
            className={({ isActive }) =>
              `px-4 py-1.5 text-sm font-medium ${isActive ? "bg-white/15 text-white" : "text-white/60 hover:text-white"}`
            }
          >
            Sale
          </NavLink>
          <NavLink
            to="/pos/shift-close"
            className={({ isActive }) =>
              `px-4 py-1.5 text-sm font-medium ${isActive ? "bg-white/15 text-white" : "text-white/60 hover:text-white"}`
            }
          >
            Shift
          </NavLink>
          <NavLink to="/" className="ml-3 px-4 py-1.5 text-sm text-white/50 hover:text-white">
            ← Back office
          </NavLink>
        </nav>
      </header>
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
