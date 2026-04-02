import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profileApi } from "../api/profile.js";
import { Badge, StatusBadge, Table } from "../components/ui/index.js";
import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  TICKET_STATUS,
  TICKET_STATUS_LABELS,
  TICKET_STATUS_COLORS,
} from "../types/index.js";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
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
        <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">
              {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.fullname}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Телефон</p>
              <p className="font-medium">{user?.phone || "Не указан"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Роль</p>
              <Badge color="blue">{user?.role || "user"}</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Всего заказов</p>
              <p className="font-medium">{user?.stats?.totalOrders || 0}</p>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div>
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
                render: (val) => `${val?.toLocaleString()} ₸`,
              },
              {
                key: "createdAt",
                label: "Дата",
                render: (val) => new Date(val).toLocaleDateString("ru-KZ"),
              },
            ]}
            data={orders.map((order) => ({
              ...order,
              onClick: () => (window.location.href = `/profile/orders/${order._id}`),
            }))}
            onRowClick={(row) =>
              row.onClick && (window.location.href = `/profile/orders/${row._id}`)
            }
          />
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
        <div>
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
                render: (val) => new Date(val).toLocaleDateString("ru-KZ"),
              },
            ]}
            data={tickets.map((ticket) => ({
              ...ticket,
              onClick: () => (window.location.href = `/profile/tickets/${ticket._id}`),
            }))}
            onRowClick={(row) =>
              row.onClick && (window.location.href = `/profile/tickets/${row._id}`)
            }
          />
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