import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ordersApi } from "../api/orders.js";
import Button from "../components/ui/Button.jsx";
import { StatusBadge } from "../components/ui/index.js";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "../types/index.js";
import { formatCurrency, formatDate, mapApiError, isCancelableOrder } from "../utils/format.js";

export default function ProfileOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelingId, setCancelingId] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await ordersApi.getMyOrders({ limit: 20 });
      setOrders(Array.isArray(data?.data) ? data.data : []);
      setPagination(data?.pagination || null);
    } catch (err) {
      setError(mapApiError(err, "Не удалось загрузить историю заказов"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    setCancelingId(orderId);
    try {
      await ordersApi.cancelOrder(orderId, { reason: "Отменен пользователем" });
      await fetchOrders();
    } catch (err) {
      setError(mapApiError(err, "Не удалось отменить заказ"));
    } finally {
      setCancelingId("");
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">История заказов</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {pagination?.total ? `Всего заказов: ${pagination.total}` : "Ваши покупки и статусы доставки"}
          </p>
        </div>
        <Link to="/profile/tracking" className="text-sm text-neutral-600 hover:text-black">
          Текущие доставки →
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-neutral-500">Загрузка заказов...</div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center">
          <p className="text-neutral-500 mb-4">У вас пока нет оформленных заказов</p>
          <Link to="/products" className="inline-flex px-4 py-2 rounded-xl bg-black text-white text-sm">
            Перейти к каталогу
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <article key={order._id} className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-medium text-sm sm:text-base">{order.orderNumber}</p>
                  <p className="text-xs sm:text-sm text-neutral-500">{formatDate(order.createdAt)}</p>
                </div>

                <StatusBadge
                  status={order.status}
                  labels={ORDER_STATUS_LABELS}
                  colors={ORDER_STATUS_COLORS}
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="font-semibold">{formatCurrency(order.totalPrice)}</p>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/profile/orders/${order._id}`}
                    className="px-3 py-2 rounded-xl border border-neutral-200 text-sm hover:bg-neutral-100"
                  >
                    Детали
                  </Link>

                  {isCancelableOrder(order.status) && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleCancel(order._id)}
                      loading={cancelingId === order._id}
                    >
                      Отменить
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}