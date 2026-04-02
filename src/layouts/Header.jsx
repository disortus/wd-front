import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import useCartStore from "../store/cartStore.js";
import { ROLES } from "../types/index.js";
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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Store</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm text-gray-600 hover:text-black transition-colors">
              Каталог
            </Link>
            <Link to="/products" className="text-sm text-gray-600 hover:text-black transition-colors">
              Товары
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            {isAuthenticated && (
              <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
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

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium">{user?.fullname}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to={getDashboardLink()}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      {role === ROLES.USER ? "Профиль" : "Панель"}
                    </Link>
                    <Link
                      to="/profile/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      Мои заказы
                    </Link>
                    <Link
                      to="/profile/tickets"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      Мои обращения
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-black transition-colors px-3 py-2"
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
          </div>
        </div>
      </div>
    </header>
  );
}