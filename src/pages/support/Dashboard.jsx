import { useEffect, useState } from "react";
import { supportApi } from "../../api/support.js";
import { TICKET_STATUS_LABELS, TICKET_PRIORITY_LABELS } from "../../types/index.js";
import { mapApiError } from "../../utils/format.js";

const PERIODS = [
  { value: "1d", label: "Сегодня" },
  { value: "7d", label: "7 дней" },
  { value: "30d", label: "30 дней" },
];

export default function SupportDashboard() {
  const [stats, setStats] = useState(null);
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const [statsRes, ticketsRes] = await Promise.all([
        supportApi.getStats(),
        supportApi.getMyTickets({ limit: 10 }),
      ]);
      setStats(statsRes.data.data);
      setMyTickets(ticketsRes.data.data || []);
    } catch (err) {
      setError(mapApiError(err, "Не удалось загрузить данные"));
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Панель поддержки</h1>
          <p className="text-gray-500 mt-1">Управление тикетами и помощь клиентам</p>
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

      {/* Error Message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Открытые"
          value={stats?.open || 0}
          icon="📩"
          color="blue"
        />
        <StatCard
          title="Мои"
          value={stats?.myAssigned || 0}
          icon="👤"
          color="purple"
        />
        <StatCard
          title="Решенные"
          value={stats?.myResolved || 0}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Закрытые"
          value={stats?.myClosed || 0}
          icon="🔒"
          color="gray"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Среднее время ответа</p>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.avgResponseTime ? `${Math.round(stats.avgResponseTime)} мин` : "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Рейтинг</p>
          <p className="text-3xl font-bold text-yellow-600">
            {stats?.rating?.toFixed(1) || "—"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-2">Уровень удовлетворенности</p>
          <p className="text-3xl font-bold text-green-600">
            {stats?.satisfactionRate ? `${stats.satisfactionRate}%` : "—"}
          </p>
        </div>
      </div>

      {/* Tickets by Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-semibold mb-4">Тикеты по статусам</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Открытые</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {stats?.open || 0}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">В работе</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {stats?.myAssigned || 0}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Решенные</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {stats?.myResolved || 0}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Закрытые</p>
            <p className="text-2xl font-bold text-gray-600 mt-1">
              {stats?.myClosed || 0}
            </p>
          </div>
        </div>
      </div>

      {/* My Tickets Table */}
      {myTickets.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Мои тикеты</h2>
            <a href="/support/tickets" className="text-sm text-blue-600 hover:text-blue-800">
              Все тикеты →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Тема</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Приоритет</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {myTickets.slice(0, 5).map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-sm">
                      #{ticket.ticketNumber || ticket._id?.slice(-6)}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm truncate max-w-[200px]">
                        {ticket.subject}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {TICKET_CATEGORY_LABELS[ticket.category] || ticket.category}
                    </td>
                    <td className="px-4 py-3">
                      <PriorityBadge priority={ticket.priority} />
                    </td>
                    <td className="px-4 py-3">
                      <TicketStatusBadge status={ticket.status} />
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
        <QuickAction href="/support/open" icon="📥" label="Открытые тикеты" />
        <QuickAction href="/support/tickets" icon="📋" label="Мои тикеты" />
        <QuickAction href="/support/tickets?status=assigned" icon="🔧" label="В работе" />
        <QuickAction href="/support/tickets?status=resolved" icon="✅" label="Решённые" />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    gray: "bg-gray-50 text-gray-600",
    yellow: "bg-yellow-50 text-yellow-600",
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

function TicketStatusBadge({ status }) {
  const colors = {
    open: "bg-blue-100 text-blue-800",
    assigned: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
    reopened: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || "bg-gray-100"}`}>
      {TICKET_STATUS_LABELS[status] || status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const colors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-yellow-100 text-yellow-800",
    urgent: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority] || "bg-gray-100"}`}>
      {TICKET_PRIORITY_LABELS[priority] || priority}
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

// Ticket category labels map
const TICKET_CATEGORY_LABELS = {
  order: "Заказ",
  product: "Товар",
  delivery: "Доставка",
  payment: "Оплата",
  account: "Аккаунт",
  technical: "Технический",
  other: "Другое",
};