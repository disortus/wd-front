import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profileApi } from "../api/profile.js";
import { Badge, StatusBadge, Table } from "../components/ui/index.js";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  ROLE_LABELS,
  TICKET_STATUS_LABELS,
  TICKET_STATUS_COLORS,
} from "../types/index.js";
import { formatCurrency, formatDate } from "../utils/format.js";
import { useAuthStore } from "../store/authStore.js";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const setUserData = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, ordersRes, ticketsRes] = await Promise.all([
          profileApi.getMe(),
          profileApi.getOrderHistory({ limit: 5 }),
          profileApi.getMyTickets({ limit: 5 }),
        ]);
        setUser(profileRes.data.data);
        setOrders(ordersRes.data.data || []);
        setTickets(ticketsRes.data.data || []);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveName = async () => {
    if (!nameValue.trim()) {
      setError("Имя не может быть пустым");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await profileApi.updateMe({ fullname: nameValue.trim() });
      setUser(res.data.data);
      setUserData(res.data.data);
      setEditingName(false);
      setSuccess("Имя успешно изменено");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!emailValue.trim()) {
      setError("Email не может быть пустым");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setError("Некорректный формат email");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await profileApi.updateEmail(emailValue.trim());
      setUser(res.data.data);
      setUserData(res.data.data);
      setEditingEmail(false);
      setSuccess("Email успешно изменен");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  const tabs = [
    { key: "profile", label: "Профиль" },
    { key: "orders", label: "Заказы" },
    { key: "tickets", label: "Обращения" },
  ];

  const totalOrders = user?.stats?.totalOrders ?? orders.length;
  const totalTickets = user?.stats?.totalTickets ?? tickets.length;
  const activeOrders = user?.stats?.activeOrders ?? 0;
  const roleLabel = ROLE_LABELS?.[user?.role] || "Клиент";
  const memberSince = user?.createdAt ? formatDate(user.createdAt) : "Недавно";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 text-white p-6 sm:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 border border-white/20 backdrop-blur flex items-center justify-center text-xl font-semibold">
              {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-white/80 text-sm">Личный кабинет</p>
              <h1 className="text-2xl sm:text-3xl font-semibold mt-0.5">{user?.fullname || "Пользователь"}</h1>
              <p className="text-sm text-white/80 mt-1">{user?.email || "Email не указан"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/profile/orders"
              className="px-4 py-2 rounded-xl bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-100 transition-colors"
            >
              Мои заказы
            </Link>
            <Link
              to="/support/create"
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/25 text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Написать в поддержку
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="text-xs text-neutral-500 mb-1">Всего заказов</p>
          <p className="text-2xl font-semibold">{totalOrders}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="text-xs text-neutral-500 mb-1">Активные заказы</p>
          <p className="text-2xl font-semibold">{activeOrders}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="text-xs text-neutral-500 mb-1">Обращения</p>
          <p className="text-2xl font-semibold">{totalTickets}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="text-xs text-neutral-500 mb-1">С нами с</p>
          <p className="text-sm sm:text-base font-semibold">{memberSince}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              activeTab === tab.key
                ? "bg-white text-black shadow-sm font-medium"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-5">Данные профиля</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* ФИО - редактируемое */}
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">ФИО</p>
                {!editingName ? (
                  <button
                    onClick={() => {
                      setNameValue(user?.fullname || "");
                      setEditingName(true);
                      setError("");
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Изменить
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={handleSaveName}
                      disabled={saving}
                      className="text-xs text-green-600 hover:text-green-800 disabled:opacity-50"
                    >
                      {saving ? "..." : "Сохранить"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingName(false);
                        setError("");
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Отмена
                    </button>
                  </div>
                )}
              </div>
              {editingName ? (
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите ФИО"
                  autoFocus
                />
              ) : (
                <p className="font-medium">{user?.fullname || "Не указано"}</p>
              )}
            </div>

            {/* Email - редактируемое */}
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">Email</p>
                {!editingEmail ? (
                  <button
                    onClick={() => {
                      setEmailValue(user?.email || "");
                      setEditingEmail(true);
                      setError("");
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    {user?.email ? "Изменить" : "Указать"}
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={handleSaveEmail}
                      disabled={saving}
                      className="text-xs text-green-600 hover:text-green-800 disabled:opacity-50"
                    >
                      {saving ? "..." : "Сохранить"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingEmail(false);
                        setError("");
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Отмена
                    </button>
                  </div>
                )}
              </div>
              {editingEmail ? (
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Введите email"
                  autoFocus
                />
              ) : (
                <p className="font-medium break-words">{user?.email || "Не указан"}</p>
              )}
            </div>

            {/* Телефон - только чтение */}
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Телефон</p>
              <p className="font-medium">{user?.phone || "Не указан"}</p>
            </div>

            {/* Роль */}
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Роль</p>
              <Badge color="blue">{roleLabel}</Badge>
            </div>

            {/* Открытых заказов */}
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Открытых заказов</p>
              <p className="font-medium">{activeOrders}</p>
            </div>

            {/* Всего обращений */}
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Всего обращений</p>
              <p className="font-medium">{totalTickets}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/profile/orders"
              className="px-4 py-2 rounded-xl border border-neutral-200 text-sm hover:bg-neutral-50 transition-colors"
            >
              История заказов
            </Link>
            <Link
              to="/profile/tickets"
              className="px-4 py-2 rounded-xl border border-neutral-200 text-sm hover:bg-neutral-50 transition-colors"
            >
              Мои обращения
            </Link>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Последние заказы</h2>
          <Table
            columns={[
              {
                key: "orderNumber",
                label: "Номер",
                render: (val) => <span className="font-medium">{val}</span>,
              },
              {
                key: "status",
                label: "Статус",
                render: (val) => (
                  <StatusBadge
                    status={val}
                    labels={ORDER_STATUS_LABELS}
                    colors={ORDER_STATUS_COLORS}
                  />
                ),
              },
              {
                key: "totalPrice",
                label: "Сумма",
                render: (val) => formatCurrency(val),
              },
              {
                key: "createdAt",
                label: "Дата",
                render: (val) => formatDate(val),
              },
            ]}
            data={orders}
            onRowClick={(row) => navigate(`/profile/orders/${row._id}`)}
          />
          {orders.length === 0 && (
            <div className="rounded-xl border border-dashed border-neutral-300 p-6 text-sm text-neutral-500">
              У вас пока нет заказов.
            </div>
          )}
          <div className="mt-4">
            <Link
              to="/profile/orders"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Все заказы →
            </Link>
          </div>
        </div>
      )}

      {/* Tickets Tab */}
      {activeTab === "tickets" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Последние обращения</h2>
          <Table
            columns={[
              {
                key: "ticketNumber",
                label: "Номер",
                render: (val) => <span className="font-medium">{val}</span>,
              },
              {
                key: "subject",
                label: "Тема",
              },
              {
                key: "status",
                label: "Статус",
                render: (val) => (
                  <StatusBadge
                    status={val}
                    labels={TICKET_STATUS_LABELS}
                    colors={TICKET_STATUS_COLORS}
                  />
                ),
              },
              {
                key: "createdAt",
                label: "Дата",
                render: (val) => formatDate(val),
              },
            ]}
            data={tickets}
            onRowClick={(row) => navigate(`/profile/tickets/${row._id}`)}
          />
          {tickets.length === 0 && (
            <div className="rounded-xl border border-dashed border-neutral-300 p-6 text-sm text-neutral-500">
              Обращений пока нет. Если нужна помощь — создайте первое обращение.
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <Link
              to="/profile/tickets"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Все обращения →
            </Link>
            <Link
              to="/support/create"
              className="text-sm bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Создать обращение
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
