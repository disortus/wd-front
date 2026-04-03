import { Link } from "react-router-dom";
import Card from "./ui/Card.jsx";
import { getProductSlug } from "../utils/format.js";

export default function ProductCard({ product }) {
  const price = product.price;
  const slug = getProductSlug(product);
  const encodedSlug = slug ? encodeURIComponent(slug) : "";

  return (
    <Link to={encodedSlug ? `/products/${encodedSlug}` : "/products"}>
      <Card hover>
        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-4xl">📦</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2 mb-2">
            {product.title}
          </h3>
          <p className="text-lg font-semibold">{price.toLocaleString()} ₸</p>
        </div>
      </Card>
    </Link>
  );
}