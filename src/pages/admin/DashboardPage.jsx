import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminApi } from "../../api/admin.js";
import { formatCurrency } from "../../utils/format.js";
import { ORDER_STATUS_LABELS, ROLE_LABELS } from "../../types/index.js";

const PERIODS = [
  { value: "1d", label: "Сегодня" },
  { value: "7d", label: "7 дней" },
  { value: "30d", label: "30 дней" },
  { value: "90d", label: "90 дней" },
];

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState(null);
  const [salesAnalytics, setSalesAnalytics] = useState(null);
  const [staffMetrics, setStaffMetrics] = useState([]);
  const [period, setPeriod] = useState("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [overviewData, salesRes, staffRes] = await Promise.all([
        adminApi.getSystemOverview(),
        adminApi.getSalesAnalytics({ period }),
        adminApi.getStaffMetrics(),
      ]);
      setOverview(overviewData.data.data);
      setSalesAnalytics(salesRes.data.data);
      setStaffMetrics(staffRes.data.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
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

  const data = salesAnalytics?.summary || {};
  const recentOrders = overview?.recentOrders || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
          <p className="text-gray-500 mt-1">Обзор системы и аналитика продаж</p>
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
          title="Всего заказов"
          value={data.totalOrders || 0}
          icon="📦"
          color="blue"
        />
        <StatCard
          title="Выполнено"
          value={data.completedOrders || 0}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Выручка"
          value={formatCurrency(data.totalRevenue || 0)}
          icon="💰"
          color="yellow"
        />
        <StatCard
          title="Средний чек"
          value={formatCurrency(data.avgOrderValue || 0)}
          icon="📊"
          color="purple"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Активные заказы</p>
          <p className="text-3xl font-bold text-blue-600">
            {overview?.status?.activeOrders || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Отмененные</p>
          <p className="text-3xl font-bold text-red-600">
            {data.canceledOrders || 0}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Конверсия</p>
          <p className="text-3xl font-bold text-green-600">
            {data.completionRate || 0}%
          </p>
        </div>
      </div>

      {/* Daily Sales Chart */}
      {salesAnalytics?.dailyStats?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold mb-4">Продажи по дням</h2>
          <div className="h-64 flex items-end gap-2">
            {salesAnalytics.dailyStats.map((day, idx) => {
              const maxRevenue = Math.max(...salesAnalytics.dailyStats.map(d => d.revenue));
              const height = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t relative" style={{ height: "200px" }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{day._id?.slice(5)}</span>
                  <span className="text-xs font-medium">{formatCurrency(day.revenue)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Metrics */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Метрики персонала</h2>
            <Link to="/admin/staff" className="text-sm text-blue-600 hover:text-blue-800">
              Управление →
            </Link>
          </div>
          <div className="overflow-x-auto max-h-80">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сотрудник</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Роль</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Заказов</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Выручка</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staffMetrics.map((staff) => (
                  <tr key={staff.userId} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                          {staff.fullname?.[0] || "?"}
                        </div>
                        <span className="font-medium text-gray-900 truncate max-w-[100px]">{staff.fullname}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {ROLE_LABELS[staff.role] || staff.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {staff.totalOrdersHandled || 0}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-green-600">
                      {formatCurrency(staff.revenueGenerated || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Последние заказы</h2>
            <Link to="/moderator/orders" className="text-sm text-blue-600 hover:text-blue-800">
              Все заказы →
            </Link>
          </div>
          <div className="overflow-x-auto max-h-80">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Номер</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Сумма</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-sm">{order.orderNumber}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{order.userSnapshot?.fullname || "N/A"}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(order.totalPrice)}</td>
                    <td className="px-4 py-3">
                      <StatusBadgeMini status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStat
          label="Пользователи"
          value={overview?.totals?.users || 0}
          icon="👥"
        />
        <QuickStat
          label="Товары"
          value={overview?.totals?.products || 0}
          icon="📱"
        />
        <QuickStat
          label="Категории"
          value={overview?.totals?.categories || 0}
          icon="📂"
        />
        <QuickStat
          label="Обращения"
          value={overview?.totals?.tickets || 0}
          icon="🎫"
        />
      </div>

      {/* Top Products */}
      {salesAnalytics?.topProducts?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Топ товаров по выручке</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {salesAnalytics.topProducts.slice(0, 5).map((product, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{product.title}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{formatCurrency(product.totalRevenue)}</p>
                  <p className="text-sm text-gray-500">{product.totalQuantity} шт.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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

function QuickStat({ label, value, icon }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 text-white">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadgeMini({ status }) {
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
