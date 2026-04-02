import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../api/products.js";
import Card from "../components/ui/Card.jsx";

export default function CatalogPage() {
  const [catalogTree, setCatalogTree] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const { data } = await productsApi.getCatalogTree();
        setCatalogTree(data.data);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold mb-8">Каталог</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogTree &&
          Object.entries(catalogTree).map(([catSlug, category]) => (
            <Card key={catSlug}>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                <div className="space-y-2">
                  {Object.entries(category.subcategories).map(
                    ([subSlug, subcategory]) => (
                      <Link
                        key={subSlug}
                        to={`/products?category=${catSlug}&subcategory=${subSlug}`}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {subcategory.name}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}