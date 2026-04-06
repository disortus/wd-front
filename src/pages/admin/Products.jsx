import { useEffect, useMemo, useRef, useState } from "react";
import { adminApi } from "../../api/admin.js";
import { productsApi } from "../../api/products.js";
import Button from "../../components/ui/Button.jsx";
import { Input, Select, Textarea, Checkbox } from "../../components/ui/index.js";
import { formatCurrency, mapApiError, getImageUrl, getImageUrls } from "../../utils/format.js";
import { ATTRIBUTE_DEFINITIONS, getAttributeValues } from "../../constants/catalog.js";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [catalogTree, setCatalogTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const createFileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const [createForm, setCreateForm] = useState({
    title: "",
    categorySlug: "",
    subcategorySlug: "",
    description: "",
    price: "",
    stock: "0",
    imagesText: "",
  });

  const [createImageFiles, setCreateImageFiles] = useState([]);
  const [createImagePreviews, setCreateImagePreviews] = useState([]);

  const [createAttributes, setCreateAttributes] = useState({});

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    isActive: true,
    imagesText: "",
  });

  const [editImageFiles, setEditImageFiles] = useState([]);
  const [editImagePreviews, setEditImagePreviews] = useState([]);

  const [editAttributes, setEditAttributes] = useState({});

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await adminApi.getProducts({ limit: 100 });
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

  const currentAttributeDefs = useMemo(() => {
    const subcat = createForm.subcategorySlug;
    if (!subcat) return [];
    return ATTRIBUTE_DEFINITIONS[subcat] || [];
  }, [createForm.subcategorySlug]);

  const editAttributeDefs = useMemo(() => {
    if (!selectedProduct?.subcategorySlug) return [];
    return ATTRIBUTE_DEFINITIONS[selectedProduct.subcategorySlug] || [];
  }, [selectedProduct?.subcategorySlug]);

  const handleCreateInput = (key, value) => {
    setCreateForm((prev) => {
      const next = { ...prev, [key]: value };

      if (key === "categorySlug") {
        next.subcategorySlug = "";
        setCreateAttributes({});
      }

      return next;
    });
  };

  const handleCreateImageFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setCreateImageFiles(files);
    
    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setCreateImagePreviews(previews);
  };

  const handleEditImageFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setEditImageFiles(files);
    
    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setEditImagePreviews(previews);
  };

  const handleCreateAttributeChange = (key, value) => {
    setCreateAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditInput = (key, value) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditAttributeChange = (key, value) => {
    setEditAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const buildAttributesArray = (attrsObj) => {
    return Object.entries(attrsObj)
      .filter(([, value]) => value !== "" && value !== undefined && value !== null)
      .map(([key, value]) => {
        const def = currentAttributeDefs.find((d) => d.key === key) || editAttributeDefs.find((d) => d.key === key);
        return {
          key,
          label: def?.label || key,
          value: String(value),
          type: def?.type || "string",
        };
      });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setError("");

    if (!createForm.title || !createForm.categorySlug || !createForm.subcategorySlug || !createForm.price) {
      setError("Для создания товара заполните обязательные поля");
      return;
    }

    const attributes = buildAttributesArray(createAttributes);

    // Get images from text input (URLs)
    const images = createForm.imagesText
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);

    setCreating(true);
    try {
      // First create the product
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

      const { data } = await adminApi.createProduct(payload);
      
      // If there are image files, upload them
      if (createImageFiles.length > 0 && data?.data?._id) {
        const formData = new FormData();
        createImageFiles.forEach((file) => {
          formData.append("images", file);
        });
        await adminApi.uploadProductImages(data.data._id, formData);
      }

      setCreateForm({
        title: "",
        categorySlug: "",
        subcategorySlug: "",
        description: "",
        price: "",
        stock: "0",
        imagesText: "",
      });
      setCreateAttributes({});
      setCreateImageFiles([]);
      setCreateImagePreviews([]);
      if (createFileInputRef.current) {
        createFileInputRef.current.value = "";
      }
      await fetchProducts();
    } catch (err) {
      setError(mapApiError(err, "Не удалось создать товар"));
    } finally {
      setCreating(false);
    }
  };

  const openEditModal = async (product) => {
    setSelectedProduct(product);

    const attrsObj = {};
    (product.attributes || []).forEach((attr) => {
      attrsObj[attr.key] = attr.value;
    });

    setEditAttributes(attrsObj);
    setEditForm({
      title: product.title || "",
      description: product.description || "",
      price: String(product.price || ""),
      stock: String(product.stock || 0),
      isActive: product.isActive !== false,
      imagesText: (product.images || []).join("\n"),
    });
    setEditImageFiles([]);
    setEditImagePreviews([]);
    setEditingId(product._id);
    setShowModal(true);
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    const attributes = buildAttributesArray(editAttributes);

    const images = editForm.imagesText
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      price: Number(editForm.price),
      stock: Number(editForm.stock),
      isActive: editForm.isActive,
      attributes,
      images,
    };

    setProcessingId(`edit-${selectedProduct._id}`);
    try {
      await adminApi.updateProduct(selectedProduct._id, payload);
      
      // If there are new image files, upload them
      if (editImageFiles.length > 0) {
        const formData = new FormData();
        editImageFiles.forEach((file) => {
          formData.append("images", file);
        });
        await adminApi.uploadProductImages(selectedProduct._id, formData);
      }
      
      setShowModal(false);
      setEditingId(null);
      setSelectedProduct(null);
      setEditImageFiles([]);
      setEditImagePreviews([]);
      if (editFileInputRef.current) {
        editFileInputRef.current.value = "";
      }
      await fetchProducts();
    } catch (err) {
      setError(mapApiError(err, "Не удалось обновить товар"));
    } finally {
      setProcessingId("");
    }
  };

  const handleDeleteImage = async (productId, imageIndex) => {
    if (!window.confirm("Удалить это изображение?")) return;

    setProcessingId(`delimg-${productId}-${imageIndex}`);
    try {
      await adminApi.deleteProductImage(productId, imageIndex);
      await fetchProducts();
    } catch (err) {
      setError(mapApiError(err, "Не удалось удалить изображение"));
    } finally {
      setProcessingId("");
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

  const renderAttributeField = (def, value, onChange, disabled = false) => {
    const commonValues = getAttributeValues(def.key);
    const hasOptions = commonValues.length > 0;

    if (def.type === "boolean") {
      return (
        <Checkbox
          label={def.label}
          checked={value === "true" || value === true}
          onChange={(e) => onChange(def.key, e.target.checked ? "true" : "false")}
          disabled={disabled}
        />
      );
    }

    if (def.type === "number") {
      if (hasOptions) {
        return (
          <Select
            label={def.label}
            value={value || ""}
            onChange={(e) => onChange(def.key, e.target.value)}
            disabled={disabled}
          >
            <option value="">Выберите...</option>
            {commonValues.map((v) => (
              <option key={v} value={v}>
                {v} {def.unit || ""}
              </option>
            ))}
          </Select>
        );
      }
      return (
        <Input
          label={def.label}
          type="number"
          value={value || ""}
          onChange={(e) => onChange(def.key, e.target.value)}
          placeholder={def.unit ? `${def.unit}` : ""}
          disabled={disabled}
        />
      );
    }

    if (hasOptions) {
      return (
        <Select
          label={def.label}
          value={value || ""}
          onChange={(e) => onChange(def.key, e.target.value)}
          disabled={disabled}
        >
          <option value="">Выберите...</option>
          {commonValues.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
      );
    }

    return (
      <Input
        label={def.label}
        value={value || ""}
        onChange={(e) => onChange(def.key, e.target.value)}
        placeholder={def.unit ? `${def.unit}` : ""}
        disabled={disabled}
      />
    );
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

        {/* Image URLs */}
        <Textarea
          label="Изображения (URL через запятую или с новой строки)"
          rows={2}
          value={createForm.imagesText}
          onChange={(e) => handleCreateInput("imagesText", e.target.value)}
          placeholder="https://.../img1.jpg, https://.../img2.jpg"
        />

        {/* Image File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Или загрузите файлы изображений
          </label>
          <input
            ref={createFileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleCreateImageFilesChange}
            className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
          />
          {createImagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {createImagePreviews.map((preview, idx) => (
                <img
                  key={idx}
                  src={preview}
                  alt={`Preview ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        {currentAttributeDefs.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <h4 className="font-medium text-neutral-700">Характеристики товара</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentAttributeDefs.map((def) => (
                <div key={def.key}>
                  {renderAttributeField(def, createAttributes[def.key], handleCreateAttributeChange)}
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Product List */}
      <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 text-xs uppercase tracking-wide text-neutral-500 border-b border-neutral-200">
          <div className="col-span-3">Товар</div>
          <div className="col-span-2">Цена</div>
          <div className="col-span-2">Остаток</div>
          <div className="col-span-5 text-right">Действия</div>
        </div>

        {products.map((item) => {
          const itemImage = getImageUrl(item.images?.[0]);
          return (
            <div key={item._id} className="grid grid-cols-12 gap-3 items-center px-4 py-3 border-b border-neutral-100 last:border-0">
              <div className="col-span-3 min-w-0">
                <div className="flex items-center gap-2">
                  {itemImage && (
                    <img
                      src={itemImage}
                      alt=""
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-xs text-neutral-500 truncate">{item.slug}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-sm">{formatCurrency(item.price)}</div>
              <div className="col-span-2 text-sm font-medium">{item.stock ?? 0}</div>
              <div className="col-span-5 text-right flex justify-end gap-2">
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
                  variant="secondary"
                  disabled={editingId !== null}
                  onClick={() => openEditModal(item)}
                >
                  Изменить
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
          );
        })}

        {products.length === 0 && (
          <div className="px-4 py-8 text-center text-neutral-500">Товары не найдены</div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="font-semibold">Редактировать товар</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setSelectedProduct(null);
                  setEditImageFiles([]);
                  setEditImagePreviews([]);
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Название"
                  value={editForm.title}
                  onChange={(e) => handleEditInput("title", e.target.value)}
                />

                <Input
                  label="Цена"
                  type="number"
                  value={editForm.price}
                  onChange={(e) => handleEditInput("price", e.target.value)}
                />

                <Input
                  label="Остаток"
                  type="number"
                  value={editForm.stock}
                  onChange={(e) => handleEditInput("stock", e.target.value)}
                />

                <div className="flex items-center gap-2 h-full pb-5">
                  <Checkbox
                    label="Активен"
                    checked={editForm.isActive}
                    onChange={(e) => handleEditInput("isActive", e.target.checked)}
                  />
                </div>
              </div>

              <Textarea
                label="Описание"
                rows={3}
                value={editForm.description}
                onChange={(e) => handleEditInput("description", e.target.value)}
              />

              <Textarea
                label="Изображения (URL через запятую или с новой строки)"
                rows={3}
                value={editForm.imagesText}
                onChange={(e) => handleEditInput("imagesText", e.target.value)}
              />

              {/* Current Images */}
              {selectedProduct.images?.length > 0 && (
                <div>
                  <p className="text-sm text-neutral-500 mb-2">Текущие изображения:</p>
                  <div className="flex flex-wrap gap-2">
                    {getImageUrls(selectedProduct.images).map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={img}
                          alt=""
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => handleDeleteImage(selectedProduct._id, idx)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs"
                          disabled={processingId === `delimg-${selectedProduct._id}-${idx}`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div>
                <p className="text-sm text-neutral-500 mb-2">Загрузить новые изображения:</p>
                <input
                  ref={editFileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleEditImageFilesChange}
                  className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                />
                {editImagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editImagePreviews.map((preview, idx) => (
                      <img
                        key={idx}
                        src={preview}
                        alt={`New Preview ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>

              {editAttributeDefs.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-neutral-200">
                  <h4 className="font-medium text-neutral-700">Характеристики товара</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {editAttributeDefs.map((def) => (
                      <div key={def.key}>
                        {renderAttributeField(def, editAttributes[def.key], handleEditAttributeChange)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-neutral-200 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setSelectedProduct(null);
                  setEditImageFiles([]);
                  setEditImagePreviews([]);
                }}
              >
                Отмена
              </Button>
              <Button
                loading={processingId === `edit-${selectedProduct._id}`}
                onClick={handleUpdateProduct}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
