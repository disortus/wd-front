import { useEffect, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { productsApi } from "../api/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { Input, Select } from "../components/ui/index.js";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [catalogTree, setCatalogTree] = useState(null);

  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";
  const search = searchParams.get("search") || "";
  const limit = parseInt(searchParams.get("limit") || "12");

  const totalPages = Math.ceil(total / limit);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit };
      if (category) params.category = category;
      if (subcategory) params.subcategory = subcategory;
      if (search) params.search = search;

      const { data } = await productsApi.getList(params);
      setProducts(data.data || []);
      setTotal(data.total || 0);
    } catch {
      setError("Ошибка загрузки товаров");
    } finally {
      setLoading(false);
    }
  }, [page, limit, category, subcategory, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Fetch catalog tree for filters
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const { data } = await productsApi.getCatalogTree();
        setCatalogTree(data.data);
      } catch {
        // Silent fail for catalog tree
      }
    };
    fetchCatalog();
  }, []);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold mb-8">Товары</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5">
            <Input
              label="Поиск"
              placeholder="Название товара..."
              value={search}
              onChange={(e) => updateFilter("search", e.target.value)}
            />

            {catalogTree && (
              <>
                <Select
                  label="Категория"
                  value={category}
                  onChange={(e) => {
                    updateFilter("category", e.target.value);
                    updateFilter("subcategory", "");
                  }}
                >
                  <option value="">Все категории</option>
                  {Object.entries(catalogTree).map(([slug, cat]) => (
                    <option key={slug} value={slug}>{cat.name}</option>
                  ))}
                </Select>

                {category && catalogTree[category] && (
                  <Select
                    label="Подкатегория"
                    value={subcategory}
                    onChange={(e) => updateFilter("subcategory", e.target.value)}
                  >
                    <option value="">Все подкатегории</option>
                    {Object.entries(catalogTree[category].subcategories).map(
                      ([slug, sub]) => (
                        <option key={slug} value={slug}>{sub.name}</option>
                      )
                    )}
                  </Select>
                )}
              </>
            )}
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-4">Найдено: {total} товаров</p>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), page: String(p) })}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-black text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}