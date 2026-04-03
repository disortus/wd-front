import { Link, Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import MobileNav from "../components/MobileNav.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col text-neutral-900">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <footer className="border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-neutral-500">
              © {new Date().getFullYear()} APL. STORE. Все права защищены.
            </p>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-500">
              <Link to="/catalog" className="hover:text-black transition-colors">
                Каталог
              </Link>
              <Link to="/support/create" className="hover:text-black transition-colors">
                Поддержка
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <MobileNav />
    </div>
  );
}