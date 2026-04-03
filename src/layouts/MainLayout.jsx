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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-lg font-semibold tracking-[0.12em] mb-3">APL. STORE</p>
              <p className="text-sm text-neutral-500 leading-6">
                Интернет-магазин Apple-продукции в минималистичном стиле.
                Доставка по Казахстану и поддержка 7 дней в неделю.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Навигация</p>
              <div className="space-y-2 text-sm text-neutral-500">
                <Link to="/" className="block hover:text-black transition-colors">Главная</Link>
                <Link to="/products" className="block hover:text-black transition-colors">Товары</Link>
                <Link to="/catalog" className="block hover:text-black transition-colors">Каталог</Link>
                <Link to="/cart" className="block hover:text-black transition-colors">Корзина</Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Клиентам</p>
              <div className="space-y-2 text-sm text-neutral-500">
                <Link to="/profile/orders" className="block hover:text-black transition-colors">История заказов</Link>
                <Link to="/profile/tracking" className="block hover:text-black transition-colors">Отслеживание</Link>
                <Link to="/profile/tickets" className="block hover:text-black transition-colors">Чат с поддержкой</Link>
                <Link to="/support/create" className="block hover:text-black transition-colors">Создать обращение</Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Контакты</p>
              <div className="space-y-2 text-sm text-neutral-500">
                <p>support@aplstore.kz</p>
                <p>+7 (700) 000-00-00</p>
                <p>Пн–Вс, 09:00–21:00</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <p className="text-xs sm:text-sm text-neutral-500">
              © {new Date().getFullYear()} APL. STORE. Все права защищены.
            </p>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-500">
              <span>Политика конфиденциальности</span>
              <span>Условия возврата</span>
            </div>
          </div>
        </div>
      </footer>

      <MobileNav />
    </div>
  );
}