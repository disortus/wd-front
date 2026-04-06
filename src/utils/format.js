export const formatCurrency = (value = 0) => {
  const amount = Number(value) || 0;
  return `${new Intl.NumberFormat("ru-RU").format(amount)} ₸`;
};

export const formatDate = (value, options = { dateStyle: "medium" }) => {
  if (!value) return "—";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("ru-KZ", options).format(date);
};

export const getInitials = (value = "") => {
  const parts = value.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "A";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

export const mapApiError = (error, fallback = "Что-то пошло не так") => {
  return error?.response?.data?.message || error?.message || fallback;
};

// Базовый хост для изображений
const IMAGE_HOST = "http://localhost:5000";

// Преобразует путь к изображению в полный URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Если это уже полный URL, возвращаем как есть
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  // Если путь начинается с /imgs/, добавляем только хост
  if (imagePath.startsWith("/imgs/")) {
    return `${IMAGE_HOST}${imagePath}`;
  }
  
  // Если путь начинается с imgs/, добавляем хост и /
  if (imagePath.startsWith("imgs/")) {
    return `${IMAGE_HOST}/${imagePath}`;
  }
  
  // Иначе добавляем базовый путь
  return `${IMAGE_HOST}/imgs/${imagePath}`;
};

// Преобразует массив путей к изображениям в массив полных URL
export const getImageUrls = (images) => {
  if (!Array.isArray(images)) return [];
  return images.map((img) => getImageUrl(img)).filter(Boolean);
};

export const getProductImage = (product) => {
  const imagePath = 
    product?.images?.[0]
    || product?.image
    || product?.productSnapshot?.image
    || product?.productSnapshot?.images?.[0]
    || null;
  
  return imagePath ? getImageUrl(imagePath) : null;
};

export const getProductTitle = (product) => {
  return product?.title || product?.productSnapshot?.title || "Товар Apple";
};

export const getProductSlug = (product) => {
  return product?.slug || product?.productSnapshot?.slug || "";
};

export const getStatusHistory = (tracking) => {
  return Array.isArray(tracking?.statusHistory) ? tracking.statusHistory : [];
};

export const isCancelableOrder = (status) => {
  return !["in_delivery", "delivered", "canceled"].includes(status);
};
