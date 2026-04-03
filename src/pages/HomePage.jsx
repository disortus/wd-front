import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-14">
      <section className="bg-black rounded-3xl text-white overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-3">APL. STORE</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
              Минимализм.
              <br />
              Точность.
              <br />
              Apple-эстетика.
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 mb-7 max-w-md">
              Подберите смартфоны, наушники, часы и аксессуары в едином стиле.
              Быстрая доставка, строгий дизайн и удобный сервис на каждом шаге.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-white text-black rounded-xl hover:bg-neutral-100 transition-colors"
              >
                Смотреть товары
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-white/30 rounded-xl hover:bg-white/10 transition-colors"
              >
                Каталог
              </Link>
            </div>
          </div>

          <div className="relative min-h-[240px] sm:min-h-[320px] md:min-h-full bg-neutral-900">
            <img
              src={heroImage}
              alt="Apple products"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Коллекции</h2>
          <Link to="/products" className="text-sm text-neutral-500 hover:text-black">Все товары →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/products?subcategory=smartphones" className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white">
            <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
              <img src={heroImage} alt="Смартфоны" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">Смартфоны</h3>
              <p className="text-sm text-neutral-500">Новые модели и классические решения</p>
            </div>
          </Link>

          <Link to="/products?subcategory=headphones" className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white">
            <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
              <img src={heroImage} alt="Наушники" className="w-full h-full object-cover object-[center_20%] grayscale group-hover:grayscale-0 transition duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">Наушники</h3>
              <p className="text-sm text-neutral-500">Точный звук и лаконичная форма</p>
            </div>
          </Link>

          <Link to="/products?subcategory=smart_watches" className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white">
            <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
              <img src={heroImage} alt="Часы" className="w-full h-full object-cover object-[center_78%] group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">Часы</h3>
              <p className="text-sm text-neutral-500">Контроль активности и строгий стиль</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5">
        <div className="text-center p-6 sm:p-8 border border-neutral-200 rounded-2xl">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Быстрая доставка</h3>
          <p className="text-gray-500">Доставка по всему Казахстану за 1-3 дня</p>
        </div>
        <div className="text-center p-6 sm:p-8 border border-neutral-200 rounded-2xl">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Гарантия качества</h3>
          <p className="text-gray-500">Премиальное качество на всех устройствах</p>
        </div>
        <div className="text-center p-6 sm:p-8 border border-neutral-200 rounded-2xl">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Безопасная оплата</h3>
          <p className="text-gray-500">Надежные методы оплаты для всех</p>
        </div>
      </section>
    </div>
  );
}