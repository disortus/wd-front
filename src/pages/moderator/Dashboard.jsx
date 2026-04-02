import { useEffect, useState } from "react";
import { moderatorApi } from "../../api/moderator.js";
import Card from "../../components/ui/Card.jsx";

export default function ModeratorDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    moderatorApi.getStats().then(({ data }) => {
      setStats(data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Всего заказов</p>
            <p className="text-3xl font-bold mt-1">{stats?.totalOrders || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Выручка</p>
            <p className="text-3xl font-bold mt-1">{stats?.totalRevenue?.toLocaleString()} ₸</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">По статусам</p>
            <div className="mt-2 text-sm text-gray-600">
              {Object.entries(stats?.ordersByStatus || {}).map(([status, count]) => (
                <div key={status} className="flex justify-between">
                  <span>{status}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}