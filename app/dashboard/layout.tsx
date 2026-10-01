import { Outlet, NavLink } from "react-router";
import type { Route } from "./+types/layout";
import { requireUserId } from "~/features/auth/services/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
  return null;
}
export default function DashboardLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-green text-lg font-semibold ${
      isActive ? "text-green-300 hover:text-blue-500" : "hover:text-yellow-500"
    }`;
  return (
    <div className="flex min-h-screen">
      <aside className="bg-green-800 px-10 py-10 w-56">
        <h2 className=" text-lg font-semibold text-white mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/dashboard" end className={linkClass}>
            Overview
          </NavLink>
          <NavLink to="/dashboard/settings" end className={linkClass}>
            Settings
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
