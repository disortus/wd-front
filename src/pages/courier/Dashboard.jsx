import { useEffect, useState } from "react";
import { courierApi } from "../../api/courier.js";
import { formatCurrency } from "../../utils/format.js";
import { ORDER_STATUS_LABELS } from "../../types/index.js";

const PERIODS = [
  { value: "1d", label: "Сегодня" },
  { value: "7d", label: "7 дней" },
  { value: "30d", label: "30 дней" },
];

export default function CourierDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes] = await Promise.all([
        courierApi.getStats(),
        courierApi.getMyOrders({ limit: 10 }),
      ]);
      setStats(statsRes.data.data);
      setOrders(ordersRes.data.data || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Group orders by status
  const orderStats = {
    delivered: stats?.totalDelivered || 0,
    inDelivery: stats?.inDelivery || 0,
    pending: stats?.pending || 0,
    available: stats?.available || 0,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Панель курьера</h1>
          <p className="text-gray-500 mt-1">Управление доставками и заработок</p>
        </div>
        <div className="flex gap-2">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === p.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Доставлено"
          value={stats?.totalDelivered || 0}
          icon="📦"
          color="green"
        />
        <StatCard
          title="В доставке"
          value={stats?.inDelivery || 0}
          icon="🚚"
          color="blue"
        />
        <StatCard
          title="Ожидают"
          value={stats?.pending || 0}
          icon="⏳"
          color="yellow"
        />
        <StatCard
          title="Заработок"
          value={formatCurrency(stats?.totalEarnings || 0)}
          icon="💰"
          color="purple"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Средняя доставка</p>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.avgDeliveryTime ? `${Math.round(stats.avgDeliveryTime)} мин` : "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Рейтинг</p>
          <p className="text-3xl font-bold text-yellow-600">
            {stats?.rating?.toFixed(1) || "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Доступные заказы</p>
          <p className="text-3xl font-bold text-green-600">
            {stats?.available || 0}
          </p>
        </div>
      </div>

      {/* Orders by Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-semibold mb-4">Заказы по статусам</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Доставлено</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {orderStats.delivered}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">В доставке</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {orderStats.inDelivery}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Ожидают</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {orderStats.pending}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Свободные</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {orderStats.available}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      {orders.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Последние заказы</h2>
            <a href="/courier/orders" className="text-sm text-blue-600 hover:text-blue-800">
              Все заказы →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Номер</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Адрес</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Сумма</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-sm">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <p className="truncate max-w-[200px]">
                        {order.deliveryAddress?.street}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {formatCurrency(order.totalPrice)}
                    </td>
                    <td className="px-4 py-3">
                      <CourierStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction href="/courier/available" icon="📥" label="Доступные заказы" />
        <QuickAction href="/courier/orders" icon="🚚" label="Мои заказы" />
        <QuickAction href="/courier/orders?status=in_delivery" icon="📍" label="В доставке" />
        <QuickAction href="/courier/orders?status=delivered" icon="✅" label="Доставленные" />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function CourierStatusBadge({ status }) {
  const colors = {
    created: "bg-gray-100 text-gray-800",
    accepted_by_moderator: "bg-blue-100 text-blue-800",
    packed: "bg-purple-100 text-purple-800",
    assigned_to_courier: "bg-yellow-100 text-yellow-800",
    in_delivery: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || "bg-gray-100"}`}>
      {ORDER_STATUS_LABELS[status] || status}
    </span>
  );
}

function QuickAction({ href, icon, label }) {
  return (
    <a
      href={href}
      className="bg-gray-900 rounded-xl p-4 text-white hover:bg-gray-800 transition-colors block"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
    </a>
  );
}