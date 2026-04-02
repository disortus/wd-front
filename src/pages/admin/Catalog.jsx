import { useEffect, useState } from "react";
import { adminApi } from "../../api/admin.js";
import Card from "../../components/ui/Card.jsx";
import { Badge } from "../../components/ui/index.js";

export default function AdminCatalog() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getCategories().then(({ data }) => {
      setCategories(data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Управление каталогом</h2>
      </div>
      <div className="grid gap-4">
        {categories.map((cat) => (
          <Card key={cat._id}>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.slug}</p>
              </div>
              <Badge color={cat.isActive ? "green" : "gray"}>
                {cat.isActive ? "Активна" : "Неактивна"}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}