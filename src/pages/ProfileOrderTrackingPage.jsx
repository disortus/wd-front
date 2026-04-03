import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { profileApi } from "../api/profile.js";
import { StatusBadge } from "../components/ui/index.js";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "../types/index.js";
import { formatCurrency, formatDate, mapApiError, getStatusHistory } from "../utils/format.js";

export default function ProfileOrderTrackingPage() {
  const { orderId } = useParams();
  const [tracking, setTracking] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        if (orderId) {
          const { data } = await profileApi.getOrderTracking(orderId);
          setTracking(data?.data || null);
        } else {
          const { data } = await profileApi.getActiveOrders();
          setActiveOrders(Array.isArray(data?.data) ? data.data : []);
        }
      } catch (err) {
        setError(mapApiError(err, "Не удалось загрузить информацию о доставке"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  const history = useMemo(() => getStatusHistory(tracking), [tracking]);

  if (loading) {
    return <div className="py-20 text-center text-neutral-500">Загрузка...</div>;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {orderId ? "Отслеживание заказа" : "Текущие доставки"}
        </h1>
        <Link to="/profile/orders" className="text-sm text-neutral-600 hover:text-black">
          Все заказы →
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!orderId && (
        <div className="space-y-3">
          {activeOrders.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 p-8 text-center text-neutral-500 bg-white">
              Активных заказов нет
            </div>
          ) : (
            activeOrders.map((order) => (
              <article key={order._id} className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-neutral-500">Обновлено: {formatDate(order.updatedAt)}</p>
                  </div>

                  <StatusBadge
                    status={order.status}
                    labels={ORDER_STATUS_LABELS}
                    colors={ORDER_STATUS_COLORS}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="font-semibold">{formatCurrency(order.totalPrice)}</p>
                  <Link
                    to={`/profile/orders/${order._id}`}
                    className="px-3 py-2 rounded-xl border border-neutral-200 text-sm hover:bg-neutral-100"
                  >
                    Отследить
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      )}

      {orderId && tracking && (
        <div className="space-y-4">
          <article className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <p className="text-sm text-neutral-500">Номер заказа</p>
                <p className="font-semibold">{tracking.orderNumber}</p>
              </div>
              <StatusBadge
                status={tracking.status}
                labels={ORDER_STATUS_LABELS}
                colors={ORDER_STATUS_COLORS}
              />
            </div>

            <div className="text-sm text-neutral-600 space-y-1">
              <p>Получатель: {tracking.recipientName} — {tracking.recipientPhone}</p>
              <p>
                Адрес: {tracking.deliveryAddress?.street}, {tracking.deliveryAddress?.city}, {tracking.deliveryAddress?.country}
              </p>
              <p>Сумма: <span className="font-semibold text-neutral-900">{formatCurrency(tracking.totalPrice)}</span></p>
            </div>
          </article>

          <article className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">История статусов</h2>

            {history.length === 0 ? (
              <p className="text-sm text-neutral-500">Пока нет записей</p>
            ) : (
              <ol className="space-y-3">
                {history.map((entry, index) => (
                  <li key={`${entry.status}-${index}`} className="border-l-2 border-neutral-200 pl-3">
                    <div className="flex items-center justify-between gap-3">
                      <StatusBadge
                        status={entry.status}
                        labels={ORDER_STATUS_LABELS}
                        colors={ORDER_STATUS_COLORS}
                      />
                      <span className="text-xs text-neutral-500">{formatDate(entry.changedAt, { dateStyle: "medium", timeStyle: "short" })}</span>
                    </div>
                    {entry.note && <p className="text-sm text-neutral-600 mt-1">{entry.note}</p>}
                  </li>
                ))}
              </ol>
            )}
          </article>
        </div>
      )}
    </section>
  );
}