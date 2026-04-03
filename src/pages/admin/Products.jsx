import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../api/admin.js";
import { productsApi } from "../../api/products.js";
import Button from "../../components/ui/Button.jsx";
import { Input, Select, Textarea } from "../../components/ui/index.js";
import { formatCurrency, mapApiError } from "../../utils/format.js";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [catalogTree, setCatalogTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: "",
    categorySlug: "",
    subcategorySlug: "",
    description: "",
    price: "",
    stock: "0",
    imagesText: "",
    attributesJson: "{}",
  });

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

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const { data } = await productsApi.getCatalogTree();
        setCatalogTree(data?.data || null);
      } catch {
        // noop
      }
    };

    fetchCatalog();
  }, []);

  const categoryOptions = useMemo(() => {
    if (!catalogTree) return [];
    return Object.entries(catalogTree).map(([slug, category]) => ({
      slug,
      name: category?.name || slug,
    }));
  }, [catalogTree]);

  const subcategoryOptions = useMemo(() => {
    if (!catalogTree || !createForm.categorySlug) return [];

    const category = catalogTree[createForm.categorySlug];
    if (!category?.subcategories) return [];

    return Object.entries(category.subcategories).map(([slug, subcategory]) => ({
      slug,
      name: subcategory?.name || slug,
    }));
  }, [catalogTree, createForm.categorySlug]);

  const handleCreateInput = (key, value) => {
    setCreateForm((prev) => {
      const next = { ...prev, [key]: value };

      if (key === "categorySlug") {
        next.subcategorySlug = "";
      }

      return next;
    });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setError("");

    if (!createForm.title || !createForm.categorySlug || !createForm.subcategorySlug || !createForm.price) {
      setError("Для создания товара заполните обязательные поля");
      return;
    }

    let attributes = {};
    try {
      attributes = createForm.attributesJson.trim() ? JSON.parse(createForm.attributesJson) : {};
    } catch {
      setError("Поле attributes должно быть валидным JSON");
      return;
    }

    const images = createForm.imagesText
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      title: createForm.title.trim(),
      categorySlug: createForm.categorySlug,
      subcategorySlug: createForm.subcategorySlug,
      description: createForm.description.trim(),
      price: Number(createForm.price),
      stock: Number.isFinite(Number(createForm.stock)) ? Number(createForm.stock) : 0,
      attributes,
      images,
    };

    setCreating(true);
    try {
      await adminApi.createProduct(payload);
      setCreateForm({
        title: "",
        categorySlug: "",
        subcategorySlug: "",
        description: "",
        price: "",
        stock: "0",
        imagesText: "",
        attributesJson: "{}",
      });
      await fetchProducts();
    } catch (err) {
      setError(mapApiError(err, "Не удалось создать товар"));
    } finally {
      setCreating(false);
    }
  };

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

      <form onSubmit={handleCreateProduct} className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">Создать товар</h3>
          <Button type="submit" loading={creating}>Создать</Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Название *"
            value={createForm.title}
            onChange={(e) => handleCreateInput("title", e.target.value)}
            placeholder="AirPods Pro 2"
          />

          <Input
            label="Цена *"
            type="number"
            min="0"
            value={createForm.price}
            onChange={(e) => handleCreateInput("price", e.target.value)}
            placeholder="39990"
          />

          <Select
            label="Категория *"
            value={createForm.categorySlug}
            onChange={(e) => handleCreateInput("categorySlug", e.target.value)}
          >
            <option value="">Выберите категорию</option>
            {categoryOptions.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </Select>

          <Select
            label="Подкатегория *"
            value={createForm.subcategorySlug}
            onChange={(e) => handleCreateInput("subcategorySlug", e.target.value)}
            disabled={!createForm.categorySlug}
          >
            <option value="">Выберите подкатегорию</option>
            {subcategoryOptions.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </Select>

          <Input
            label="Остаток"
            type="number"
            min="0"
            value={createForm.stock}
            onChange={(e) => handleCreateInput("stock", e.target.value)}
            placeholder="0"
          />
        </div>

        <Textarea
          label="Описание"
          rows={3}
          value={createForm.description}
          onChange={(e) => handleCreateInput("description", e.target.value)}
          placeholder="Краткое описание товара"
        />

        <Textarea
          label="Изображения (URL через запятую или с новой строки)"
          rows={2}
          value={createForm.imagesText}
          onChange={(e) => handleCreateInput("imagesText", e.target.value)}
          placeholder="https://.../img1.jpg, https://.../img2.jpg"
        />

        <Textarea
          label="Attributes (JSON)"
          rows={4}
          value={createForm.attributesJson}
          onChange={(e) => handleCreateInput("attributesJson", e.target.value)}
          placeholder='{"color":"white","wireless":true}'
        />
      </form>

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