import { useEffect, useState } from "react";
import { adminApi } from "../../api/admin.js";
import Card from "../../components/ui/Card.jsx";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersStats] = await Promise.all([adminApi.getUserStats()]);
        setStats({ users: usersStats.data.data });
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Пользователи</p>
            <p className="text-3xl font-bold mt-1">{stats?.users?.totalUsers || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Активные</p>
            <p className="text-3xl font-bold mt-1">{stats?.users?.activeUsers || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Админы</p>
            <p className="text-3xl font-bold mt-1">{stats?.users?.usersByRole?.admin || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Модераторы</p>
            <p className="text-3xl font-bold mt-1">{stats?.users?.usersByRole?.moderator || 0}</p>
          </div>
        </Card>
      </div>
      <div className="text-center py-20 text-gray-400">
        <p>Добро пожаловать в панель администратора</p>
      </div>
    </div>
  );
}