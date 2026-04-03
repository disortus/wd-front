import { useEffect, useState } from "react";
import { adminApi } from "../../api/admin.js";
import Card from "../../components/ui/Card.jsx";
import { Badge } from "../../components/ui/index.js";
import Button from "../../components/ui/Button.jsx";
import { mapApiError } from "../../utils/format.js";

export default function AdminCatalog() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await adminApi.getCategories();
      setCategories(data.data || []);
    } catch (err) {
      setError(mapApiError(err, "Не удалось загрузить каталог"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  const toggleCategory = async (id) => {
    setProcessingId(id);
    try {
      await adminApi.toggleCategory(id);
      await fetchCategories();
    } catch (err) {
      setError(mapApiError(err, "Не удалось изменить статус категории"));
    } finally {
      setProcessingId("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Управление каталогом</h2>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {categories.map((cat) => (
          <Card key={cat._id}>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge color={cat.isActive ? "green" : "gray"}>
                  {cat.isActive ? "Активна" : "Неактивна"}
                </Badge>
                <Button
                  size="sm"
                  variant="secondary"
                  loading={processingId === cat._id}
                  onClick={() => toggleCategory(cat._id)}
                >
                  {cat.isActive ? "Выключить" : "Включить"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}