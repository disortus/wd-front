import { useCallback, useEffect, useState } from "react";
import { courierApi } from "../../api/courier.js";
import Card from "../../components/ui/Card.jsx";
import { StatusBadge } from "../../components/ui/index.js";
import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from "../../types/index.js";
import Button from "../../components/ui/Button.jsx";
import { formatCurrency, mapApiError } from "../../utils/format.js";

export default function CourierOrders({ available }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const api = available ? courierApi.getAvailableOrders : courierApi.getMyOrders;
      const { data } = await api();
      setOrders(data.data || []);
    } catch (err) {
      setError(mapApiError(err, "Не удалось загрузить заказы"));
    } finally {
      setLoading(false);
    }
  }, [available]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleAccept = async (id) => {
    setProcessingId(`accept-${id}`);
    try {
      await courierApi.acceptOrder(id);
      await loadOrders();
    } catch (err) {
      setError(mapApiError(err, "Не удалось принять заказ"));
    } finally {
      setProcessingId("");
    }
  };

  const handleStartDelivery = async (id) => {
    try {
      const { data } = await courierApi.startDelivery(id, {});
      setOrders(orders.map((o) => (o._id === id ? data.data : o)));
    } catch (err) {
      setError(mapApiError(err, "Не удалось начать доставку"));
    }
  };

  const handleDeliver = async (id) => {
    try {
      const { data } = await courierApi.markDelivered(id, {});
      setOrders(orders.map((o) => (o._id === id ? data.data : o)));
    } catch (err) {
      setError(mapApiError(err, "Не удалось завершить доставку"));
    }
  };

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  const canAcceptOrder = (order) => {
    if (!available) return false;

    const status = order?.status;
    const hasCourier = Boolean(order?.courier || order?.courierId || order?.courierSnapshot?._id);
    const blockedStatuses = [ORDER_STATUS.IN_DELIVERY, ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELED];

    return !hasCourier && !blockedStatuses.includes(status);
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {orders.map((order) => (
        <Card key={order._id}>
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">{order.orderNumber}</p>
              <p className="text-sm text-gray-500">
                {order.userSnapshot?.fullname} • {order.userSnapshot?.phone}
              </p>
              <p className="text-sm text-gray-500">
                {order.deliveryAddress?.street}, {order.deliveryAddress?.city}
              </p>
              <p className="text-sm font-semibold mt-1">{formatCurrency(order.totalPrice)}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge
                status={order.status}
                labels={ORDER_STATUS_LABELS}
                colors={ORDER_STATUS_COLORS}
              />
              {canAcceptOrder(order) && (
                <Button
                  size="sm"
                  loading={processingId === `accept-${order._id}`}
                  onClick={() => handleAccept(order._id)}
                >
                  Принять заказ
                </Button>
              )}
              {order.status === ORDER_STATUS.ASSIGNED_TO_COURIER && !available && (
                <Button size="sm" onClick={() => handleStartDelivery(order._id)}>
                  Начать доставку
                </Button>
              )}
              {order.status === ORDER_STATUS.IN_DELIVERY && (
                <Button size="sm" onClick={() => handleDeliver(order._id)}>
                  доставлен
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}