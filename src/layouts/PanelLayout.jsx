import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { DASHBOARD_NAV, ROLES } from "../types/index.js";
import clsx from "clsx";

export default function PanelLayout() {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = DASHBOARD_NAV[role] || [];

  const panelTitles = {
    [ROLES.ADMIN]: "Панель администратора",
    [ROLES.MODERATOR]: "Панель модератора",
    [ROLES.COURIER]: "Панель курьера",
    [ROLES.SUPPORT]: "Панель поддержки",
  };

  const title = panelTitles[role] || "Панель";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-xs text-gray-500 mt-1">{user?.fullname}</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "block px-3 py-2 text-sm rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            Выйти
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {navItems.find((item) => location.pathname === item.path)?.label || title}
            </h2>
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              ← На главную
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}