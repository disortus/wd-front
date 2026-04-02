import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Store. Все права защищены.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a href="/support" className="hover:text-black transition-colors">
                Поддержка
              </a>
              <a href="/profile" className="hover:text-black transition-colors">
                Профиль
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}