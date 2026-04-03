import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import useCartStore from "../store/cartStore.js";
import { ROLES, ROLE_LABELS } from "../types/index.js";
import { useEffect } from "react";

export default function Header() {
  const { user, role, isAuthenticated, logout } = useAuth();
  const { cart, fetchCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    switch (role) {
      case ROLES.ADMIN: return "/admin";
      case ROLES.MODERATOR: return "/moderator";
      case ROLES.COURIER: return "/courier";
      case ROLES.SUPPORT: return "/support";
      default: return "/profile";
    }
  };

  const cartCount = cart?.totalItems || 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-base sm:text-lg font-semibold tracking-[0.12em]">APL. STORE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            <NavLink to="/catalog" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-black" : "text-neutral-500 hover:text-black"}`}>
              Каталог
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `text-sm transition-colors ${isActive ? "text-black" : "text-neutral-500 hover:text-black"}`}>
              Товары
            </NavLink>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && (
              <Link to="/cart" className="relative p-2 hover:bg-neutral-100 rounded-xl transition-colors" aria-label="Корзина">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to={getDashboardLink()}
                  className="px-3 py-2 rounded-xl text-sm border border-neutral-200 hover:bg-neutral-100 transition-colors"
                >
                  {role === ROLES.USER ? "Профиль" : ROLE_LABELS[role]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-xl text-sm text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                >
                  Выйти
                </button>
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center">
                  {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm text-neutral-600 hover:text-black transition-colors px-3 py-2"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Регистрация
                </Link>
              </div>
            )}

            <Link
              to={isAuthenticated ? getDashboardLink() : "/login"}
              className="sm:hidden w-8 h-8 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center"
              aria-label="Профиль"
            >
              {isAuthenticated ? (user?.fullname?.charAt(0)?.toUpperCase() || "U") : "→"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}