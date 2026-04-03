import client from "./client.js";

export const moderatorApi = {
  // GET /api/moderator/orders
  getOrders: (params = {}) => client.get("/moderator/orders", { params }),

  // GET /api/moderator/orders/stats
  getStats: () => client.get("/moderator/orders/stats"),

  // GET /api/moderator/couriers
  getAvailableCouriers: () => client.get("/moderator/couriers"),

  // GET /api/moderator/orders/:id
  getOrder: (id) => client.get(`/moderator/orders/${id}`),

  // POST /api/moderator/orders/:id/accept
  acceptOrder: (id) => client.post(`/moderator/orders/${id}/accept`),

  // POST /api/moderator/orders/:id/pack
  packOrder: (id) => client.post(`/moderator/orders/${id}/pack`),

  // POST /api/moderator/orders/:id/assign
  assignToCourier: (id, courierId) =>
    client.post(`/moderator/orders/${id}/assign`, { courierId }),

  // POST /api/moderator/orders/:id/cancel
  cancelOrder: (id, data) =>
    client.post(`/moderator/orders/${id}/cancel`, data),

  // Products for moderator
  // GET /api/moderator/products
  getProducts: (params = {}) => client.get("/moderator/products", { params }),

  // PATCH /api/moderator/products/:id/increase-stock
  increaseProductStock: (id, quantity) =>
    client.patch(`/moderator/products/${id}/increase-stock`, { quantity }),
};