import { useEffect, useState } from "react";
import { moderatorApi } from "../../api/moderator.js";
import { formatCurrency } from "../../utils/format.js";
import { ORDER_STATUS_LABELS } from "../../types/index.js";

const PERIODS = [
  { value: "1d", label: "Сегодня" },
  { value: "7d", label: "7 дней" },
  { value: "30d", label: "30 дней" },
  { value: "90d", label: "90 дней" },
];

export default function ModeratorDashboard() {
  const [stats, setStats] = useState(null);
  const [salesAnalytics, setSalesAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, salesRes] = await Promise.all([
        moderatorApi.getStats(),
        moderatorApi.getSalesAnalytics({ period }),
      ]);
      setStats(statsRes.data.data);
      setSalesAnalytics(salesRes.data.data);
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

  const data = salesAnalytics?.summary || {};

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Панель модератора</h1>
          <p className="text-gray-500 mt-1">Аналитика продаж и управление заказами</p>
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
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Заказы с выручкой</p>
          <p className="text-3xl font-bold text-blue-600">
            {data.totalOrders - data.canceledOrders || 0}
          </p>
        </div>
      </div>

      {/* Daily Stats Chart */}
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

      {/* Orders by Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-semibold mb-4">Заказы по статусам</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(salesAnalytics?.ordersByStatus || {}).map(([status, count]) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">{ORDER_STATUS_LABELS[status] || status}</p>
              <p className="text-2xl font-bold mt-1">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats from Original API */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStat
          label="Всего заказов"
          value={stats?.totalOrders || 0}
          icon="📦"
        />
        <QuickStat
          label="Выручка"
          value={formatCurrency(stats?.totalRevenue || 0)}
          icon="💰"
        />
        <QuickStat
          label="Активные"
          value={stats?.activeOrders || 0}
          icon="🔥"
        />
        <QuickStat
          label="Доставка"
          value={stats?.inDeliveryOrders || 0}
          icon="🚚"
        />
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
