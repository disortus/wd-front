import { Link, Navigate, useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore.js";
import { useAuth } from "../hooks/useAuth.js";
import { useEffect } from "react";
import Button from "../components/ui/Button.jsx";
import { formatCurrency, getProductSlug } from "../utils/format.js";

function CartItem({ item }) {
  const { updateCartItem, removeFromCart } = useCartStore();
  const productSlug = getProductSlug(item?.productSnapshot);
  const encodedProductSlug = productSlug ? encodeURIComponent(productSlug) : "";

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
        {item.productSnapshot.image ? (
          <img src={item.productSnapshot.image} alt={item.productSnapshot.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">📦</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <Link
          to={encodedProductSlug ? `/products/${encodedProductSlug}` : "/products"}
          className="font-medium text-sm hover:underline"
        >
          {item.productSnapshot.title}
        </Link>
        <p className="text-sm text-gray-500 mt-0.5">
          {formatCurrency(item.priceSnapshot)} × {item.quantity}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateCartItem(item.product, Math.max(1, item.quantity - 1))}
          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <button
          onClick={() => updateCartItem(item.product, item.quantity + 1)}
          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
        >
          +
        </button>
      </div>
      <p className="w-28 text-right text-sm font-medium">
        {formatCurrency(item.priceSnapshot * item.quantity)}
      </p>
      <button
        onClick={() => removeFromCart(item.product)}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

export default function CartPage() {
  const { cart, isLoading, fetchCart, clearCart } = useCartStore();
  const { isAuthenticated, hasInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  if (hasInitialized && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h2 className="text-xl font-semibold mb-2">Корзина пуста</h2>
        <p className="text-gray-500 mb-6">Добавьте товары из каталога</p>
        <Link to="/products" className="inline-block bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
          Перейти к товарам
        </Link>
      </div>
    );
  }

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.subtotal || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Корзина</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-700 transition-colors"
        >
          Очистить корзину
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            {cart.items.map((item) => (
              <CartItem key={item.product} item={item} />
            ))}
            <p className="mt-4 text-sm text-gray-500">
              {totalItems} {totalItems === 1 ? "товар" : "товаров"}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Итого</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Товары</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-semibold">К оплате</span>
                <span className="font-semibold text-lg">{formatCurrency(totalPrice)}</span>
              </div>
            </div>
            <Button fullWidth onClick={() => navigate("/checkout")}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}