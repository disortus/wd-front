import { useEffect, useState } from "react";
import { adminApi } from "../../api/admin.js";
import { Badge, Table } from "../../components/ui/index.js";
import Button from "../../components/ui/Button.jsx";
import { formatDate, mapApiError } from "../../utils/format.js";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await adminApi.getUsers();
      setUsers(data.data || []);
    } catch (err) {
      setError(mapApiError(err, "Не удалось загрузить пользователей"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  const onToggleUser = async (id) => {
    setProcessingId(id);
    try {
      await adminApi.toggleUserActive(id);
      await fetchUsers();
    } catch (err) {
      setError(mapApiError(err, "Не удалось изменить статус пользователя"));
    } finally {
      setProcessingId("");
    }
  };

  const onDeleteUser = async (id) => {
    if (!window.confirm("Удалить пользователя?")) return;

    setProcessingId(id);
    try {
      await adminApi.deleteUser(id);
      await fetchUsers();
    } catch (err) {
      setError(mapApiError(err, "Не удалось удалить пользователя"));
    } finally {
      setProcessingId("");
    }
  };

  const roleColors = {
    admin: "red",
    moderator: "blue",
    courier: "green",
    support: "yellow",
    user: "gray",
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Table
        columns={[
          {
            key: "fullname",
            label: "Имя",
            render: (val) => <span className="font-medium">{val}</span>,
          },
          {
            key: "email",
            label: "Email",
          },
          {
            key: "role",
            label: "Роль",
            render: (val) => <Badge color={roleColors[val] || "gray"}>{val}</Badge>,
          },
          {
            key: "isActive",
            label: "Статус",
            render: (val) => (
              <Badge color={val ? "green" : "red"}>{val ? "Активен" : "Неактивен"}</Badge>
            ),
          },
          {
            key: "createdAt",
            label: "Дата",
            render: (val) => formatDate(val),
          },
          {
            key: "actions",
            label: "Действия",
            render: (_, row) => (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  loading={processingId === row._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleUser(row._id);
                  }}
                >
                  {row.isActive ? "Отключить" : "Включить"}
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  loading={processingId === row._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteUser(row._id);
                  }}
                >
                  Удалить
                </Button>
              </div>
            ),
          },
        ]}
        data={users}
      />
    </div>
  );
}
