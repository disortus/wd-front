import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsApi } from "../api/products.js";
import useCartStore from "../store/cartStore.js";
import Button from "../components/ui/Button.jsx";
import { Badge } from "../components/ui/index.js";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await productsApi.getBySlug(slug);
      setProduct(data.data);
    } catch {
      setError("Товар не найден");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = async () => {
    setAdding(true);
    const result = await addToCart(product._id, quantity, []);
    setAdding(false);
    if (result.success) {
      navigate("/cart");
    }
  };

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

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-500">{error || "Товар не найден"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
                📦
              </div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-black transition-colors"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-semibold mb-3">{product.title}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold">{product.price.toLocaleString()} ₸</span>
            <Badge color={product.stock > 0 ? "green" : "red"}>
              {product.stock > 0 ? "В наличии" : "Нет в наличии"}
            </Badge>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium">Количество:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 text-lg hover:bg-gray-50"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            loading={adding}
            disabled={product.stock === 0}
            size="lg"
            fullWidth
          >
            {product.stock > 0 ? "Добавить в корзину" : "Нет в наличии"}
          </Button>
        </div>
      </div>
    </div>
  );
}