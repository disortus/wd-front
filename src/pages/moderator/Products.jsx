import { useEffect, useState } from "react";
import { moderatorApi } from "../../api/moderator.js";
import Button from "../../components/ui/Button.jsx";
import { formatCurrency, mapApiError } from "../../utils/format.js";

export default function ModeratorProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await moderatorApi.getProducts({ limit: 50 });
      setProducts(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      setError(mapApiError(err, "Не удалось загрузить товары"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addOneToStock = async (id) => {
    setUpdatingId(id);
    try {
      await moderatorApi.increaseProductStock(id, 1);
      await fetchProducts();
    } catch (err) {
      setError(mapApiError(err, "Не удалось пополнить остаток"));
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) {
    return <p className="py-20 text-center text-neutral-500">Загрузка склада...</p>;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Склад (модератор)</h2>
        <p className="text-sm text-neutral-500">Модератор может только пополнять товары</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 text-xs uppercase tracking-wide text-neutral-500 border-b border-neutral-200">
          <div className="col-span-5">Товар</div>
          <div className="col-span-2">Цена</div>
          <div className="col-span-2">Остаток</div>
          <div className="col-span-3 text-right">Действие</div>
        </div>

        {products.map((item) => (
          <div key={item._id} className="grid grid-cols-12 gap-3 items-center px-4 py-3 border-b border-neutral-100 last:border-0">
            <div className="col-span-5 min-w-0">
              <p className="font-medium truncate">{item.title}</p>
              <p className="text-xs text-neutral-500 truncate">{item.slug}</p>
            </div>
            <div className="col-span-2 text-sm">{formatCurrency(item.price)}</div>
            <div className="col-span-2 text-sm font-medium">{item.stock ?? 0}</div>
            <div className="col-span-3 text-right">
              <Button
                size="sm"
                variant="secondary"
                loading={updatingId === item._id}
                onClick={() => addOneToStock(item._id)}
              >
                +1 к остатку
              </Button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="px-4 py-8 text-center text-neutral-500">Товары не найдены</div>
        )}
      </div>
    </section>
  );
}