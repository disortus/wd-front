import client from "./client.js";

export const cartApi = {
  // GET /api/public/cart
  getCart: () => client.get("/public/cart"),

  // POST /api/public/cart
  addToCart: (data) => client.post("/public/cart", data),

  // PUT /api/public/cart/:productId
  updateCartItem: (productId, data) => client.put(`/public/cart/${productId}`, data),

  // DELETE /api/public/cart/:productId
  removeFromCart: (productId, attributes) => {
    const params = attributes ? { attributes: JSON.stringify(attributes) } : {};
    return client.delete(`/public/cart/${productId}`, { params });
  },

  // POST /api/public/cart/clear
  clearCart: () => client.post("/public/cart/clear"),
};