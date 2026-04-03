import { useEffect, useState } from "react";
import { supportApi } from "../../api/support.js";
import Card from "../../components/ui/Card.jsx";
import { mapApiError } from "../../utils/format.js";

export default function SupportDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    supportApi.getStats().then(({ data }) => {
      setStats(data.data);
      setLoading(false);
    }).catch((err) => {
      setError(mapApiError(err, "Не удалось загрузить статистику"));
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Открытые</p>
            <p className="text-3xl font-bold mt-1">{stats?.open || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Мои</p>
            <p className="text-3xl font-bold mt-1">{stats?.myAssigned || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Решенные</p>
            <p className="text-3xl font-bold mt-1">{stats?.myResolved || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Закрытые</p>
            <p className="text-3xl font-bold mt-1">{stats?.myClosed || 0}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}