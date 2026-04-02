import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore.js";
import { ordersApi } from "../api/orders.js";
import useAuthStore from "../store/authStore.js";
import { useEffect } from "react";
import Button from "../components/ui/Button.jsx";
import { Input } from "../components/ui/index.js";

export default function CheckoutPage() {
  const { cart, fetchCart, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");

  useEffect(() => {
    fetchCart();
    if (user) {
      setRecipientName(user.fullname || "");
      setRecipientPhone(user.phone || "");
    }
  }, [fetchCart, user]);

  if (!cart || cart.items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!deliveryAddress.street || !deliveryAddress.city || !recipientName || !recipientPhone) {
      setError("Заполните все обязательные поля");
      return;
    }

    setLoading(true);
    try {
      await ordersApi.createOrder({
        deliveryAddress,
        recipientName,
        recipientPhone,
      });
      clearCart();
      navigate("/profile/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка создания заказа");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart.subtotal || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold mb-8">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Delivery Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-5">Данные доставки</h2>
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl mb-5">{error}</div>
          )}

          <div className="space-y-4">
            <Input
              label="Имя получателя *"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
            <Input
              label="Телефон получателя *"
              type="tel"
              placeholder="+77001234567"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              required
            />
            <Input
              label="Улица *"
              value={deliveryAddress.street}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
              required
            />
            <Input
              label="Город *"
              value={deliveryAddress.city}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Почтовый индекс"
                value={deliveryAddress.postalCode}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })}
              />
              <Input
                label="Страна"
                value={deliveryAddress.country}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, country: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-5">Ваш заказ</h2>

            <div className="space-y-4 mb-6 max-h-64 overflow-auto">
              {cart.items.map((item) => (
                <div key={item.product} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                    {item.productSnapshot.image ? (
                      <img src={item.productSnapshot.image} alt="" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">📦</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.productSnapshot.title}</p>
                    <p className="text-xs text-gray-500">× {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">
                    {(item.priceSnapshot * item.quantity).toLocaleString()} ₸
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Товары</span>
                <span>{totalPrice.toLocaleString()} ₸</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="font-semibold">Итого</span>
                <span className="font-semibold text-lg">{totalPrice.toLocaleString()} ₸</span>
              </div>
            </div>

            <Button fullWidth type="submit" loading={loading} className="mt-6">
              Подтвердить заказ
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}