import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="bg-black rounded-3xl text-white overflow-hidden mb-16">
        <div className="px-8 py-20 md:px-16 md:py-28">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Premium replica products
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg">
            Premium Apple replica products with fast delivery. Quality you can trust.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 text-base font-medium bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
            >
              Смотреть товары
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center px-6 py-3 text-base font-medium border border-white/30 rounded-xl hover:bg-white/10 transition-colors"
            >
              Каталог
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-8">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Быстрая доставка</h3>
          <p className="text-gray-500">Доставка по всему Казахстану за 1-3 дня</p>
        </div>
        <div className="text-center p-8">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Гарантия качества</h3>
          <p className="text-gray-500">Премиальное качество на всех устройствах</p>
        </div>
        <div className="text-center p-8">
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