import { useEffect, useState } from "react";
import { courierApi } from "../../api/courier.js";
import Card from "../../components/ui/Card.jsx";
import { StatusBadge } from "../../components/ui/index.js";
import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from "../../types/index.js";
import Button from "../../components/ui/Button.jsx";

export default function CourierOrders({ available }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = available ? courierApi.getAvailableOrders : courierApi.getMyOrders;
    api().then(({ data }) => {
      setOrders(data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [available]);

  const handleAccept = async (id) => {
    try {
      await courierApi.acceptOrder(id);
      setOrders(orders.filter((o) => o._id !== id));
    } catch {
      // Silent fail
    }
  };

  const handleStartDelivery = async (id) => {
    try {
      const { data } = await courierApi.startDelivery(id, {});
      setOrders(orders.map((o) => (o._id === id ? data.data : o)));
    } catch {
      // Silent fail
    }
  };

  const handleDeliver = async (id) => {
    try {
      const { data } = await courierApi.markDelivered(id, {});
      setOrders(orders.map((o) => (o._id === id ? data.data : o)));
    } catch {
      // Silent fail
    }
  };

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  return (
    <div className="space-y-4">
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
              <p className="text-sm font-semibold mt-1">{order.totalPrice?.toLocaleString()} ₸</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge
                status={order.status}
                labels={ORDER_STATUS_LABELS}
                colors={ORDER_STATUS_COLORS}
              />
              {order.status === ORDER_STATUS.ASSIGNED_TO_COURIER && available && (
                <Button size="sm" onClick={() => handleAccept(order._id)}>
                  Принять
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