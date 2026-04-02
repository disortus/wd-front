import { useEffect, useState } from "react";
import { courierApi } from "../../api/courier.js";
import Card from "../../components/ui/Card.jsx";

export default function CourierDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courierApi.getStats().then(({ data }) => {
      setStats(data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Доставлено</p>
            <p className="text-3xl font-bold mt-1">{stats?.totalDelivered || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">В доставке</p>
            <p className="text-3xl font-bold mt-1">{stats?.inDelivery || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Ожидают</p>
            <p className="text-3xl font-bold mt-1">{stats?.pending || 0}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-500">Сумма</p>
            <p className="text-3xl font-bold mt-1">{stats?.totalEarnings?.toLocaleString()} ₸</p>
          </div>
        </Card>
      </div>
    </div>
  );
}