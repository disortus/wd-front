import { useEffect, useState } from "react";
import { moderatorApi } from "../../api/moderator.js";
import Card from "../../components/ui/Card.jsx";
import { Badge, StatusBadge } from "../../components/ui/index.js";
import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from "../../types/index.js";

export default function ModeratorOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    moderatorApi.getOrders().then(({ data }) => {
      setOrders(data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleAccept = async (id) => {
    try {
      const { data } = await moderatorApi.acceptOrder(id);
      setOrders(orders.map((o) => (o._id === id ? data.data : o)));
    } catch {
      // Silent fail
    }
  };

  const handlePack = async (id) => {
    try {
      const { data } = await moderatorApi.packOrder(id);
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
              <p className="text-sm text-gray-500">{order.userSnapshot?.fullname}</p>
              <p className="text-sm font-semibold mt-1">{order.totalPrice?.toLocaleString()} ₸</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge
                status={order.status}
                labels={ORDER_STATUS_LABELS}
                colors={ORDER_STATUS_COLORS}
              />
              {order.status === ORDER_STATUS.CREATED && (
                <button
                  onClick={() => handleAccept(order._id)}
                  className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Принять
                </button>
              )}
              {order.status === ORDER_STATUS.ACCEPTED_BY_MODERATOR && (
                <button
                  onClick={() => handlePack(order._id)}
                  className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Упаковать
                </button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}