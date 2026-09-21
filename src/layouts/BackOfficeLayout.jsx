import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function BackOfficeLayout() {
  return (
    <div className="flex h-screen w-full bg-paper text-ink">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
