import { Home, Search, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function MobileNav() {
  const { isAuthenticated } = useAuth();

  const items = [
    { to: "/", icon: <Home size={18} />, label: "Главная" },
    { to: "/catalog", icon: <Search size={18} />, label: "Каталог" },
    { to: "/cart", icon: <ShoppingCart size={18} />, label: "Корзина" },
    { to: isAuthenticated ? "/profile" : "/login", icon: <User size={18} />, label: "Профиль" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-neutral-200 flex items-center justify-around md:hidden z-50 bg-white/95 backdrop-blur">
      {items.map((item) => (
        <Item key={item.to} to={item.to} icon={item.icon}>
          {item.label}
        </Item>
      ))}
    </nav>

  );
}

function Item({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `flex flex-col items-center gap-1 text-[11px] transition-colors ${isActive ? "text-black" : "text-neutral-400"}`}
    >
      {icon}
      {children}
    </NavLink>

  );
}