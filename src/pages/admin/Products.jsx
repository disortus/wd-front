import { useEffect, useState } from "react";
import { adminApi } from "../../api/admin.js";
import Button from "../../components/ui/Button.jsx";
import { formatCurrency, mapApiError } from "../../utils/format.js";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await adminApi.getProducts({ limit: 50 });
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

  const changeStock = async (id, mode) => {
    setProcessingId(`${mode}-${id}`);
    try {
      if (mode === "inc") {
        await adminApi.increaseStock(id, 1);
      } else {
        await adminApi.decreaseStock(id, 1);
      }
      await fetchProducts();
    } catch (err) {
      setError(mapApiError(err, "Не удалось изменить остаток"));
    } finally {
      setProcessingId("");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Удалить товар?")) return;

    setProcessingId(`del-${id}`);
    try {
      await adminApi.deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError(mapApiError(err, "Не удалось удалить товар"));
    } finally {
      setProcessingId("");
    }
  };

  if (loading) return <p className="py-20 text-center text-neutral-500">Загрузка товаров...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Управление товарами</h2>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 text-xs uppercase tracking-wide text-neutral-500 border-b border-neutral-200">
          <div className="col-span-4">Товар</div>
          <div className="col-span-2">Цена</div>
          <div className="col-span-2">Остаток</div>
          <div className="col-span-4 text-right">Действия</div>
        </div>

        {products.map((item) => (
          <div key={item._id} className="grid grid-cols-12 gap-3 items-center px-4 py-3 border-b border-neutral-100 last:border-0">
            <div className="col-span-4 min-w-0">
              <p className="font-medium truncate">{item.title}</p>
              <p className="text-xs text-neutral-500 truncate">{item.slug}</p>
            </div>
            <div className="col-span-2 text-sm">{formatCurrency(item.price)}</div>
            <div className="col-span-2 text-sm font-medium">{item.stock ?? 0}</div>
            <div className="col-span-4 text-right flex justify-end gap-2">
              <Button
                size="sm"
                variant="secondary"
                loading={processingId === `inc-${item._id}`}
                onClick={() => changeStock(item._id, "inc")}
              >
                +1
              </Button>
              <Button
                size="sm"
                variant="secondary"
                loading={processingId === `dec-${item._id}`}
                onClick={() => changeStock(item._id, "dec")}
              >
                -1
              </Button>
              <Button
                size="sm"
                variant="danger"
                loading={processingId === `del-${item._id}`}
                onClick={() => deleteProduct(item._id)}
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="px-4 py-8 text-center text-neutral-500">Товары не найдены</div>
        )}
      </div>
    </div>
  );
}