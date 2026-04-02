import { useEffect, useState } from "react";
import { adminApi } from "../../api/admin.js";
import { Badge, Table } from "../../components/ui/index.js";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getUsers().then(({ data }) => {
      setUsers(data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  const roleColors = {
    admin: "red",
    moderator: "blue",
    courier: "green",
    support: "yellow",
    user: "gray",
  };

  return (
    <div className="space-y-6">
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
            render: (val) => new Date(val).toLocaleDateString("ru-KZ"),
          },
        ]}
        data={users}
      />
    </div>
  );
}