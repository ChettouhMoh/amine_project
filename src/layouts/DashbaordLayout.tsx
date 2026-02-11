import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex bg-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex-shrink-0">
        <p className="font-bold text-xl">Dashboard</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 flex flex-col overflow-y-auto min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
