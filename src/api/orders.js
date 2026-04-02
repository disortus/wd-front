import client from "./client.js";

export const ordersApi = {
  // User orders
  // POST /api/public/orders
  createOrder: (data) => client.post("/public/orders", data),

  // GET /api/public/orders
  getMyOrders: (params = {}) => client.get("/public/orders", { params }),

  // GET /api/public/orders/:id
  getMyOrder: (id) => client.get(`/public/orders/${id}`),

  // POST /api/public/orders/:id/cancel
  cancelOrder: (id, data) => client.post(`/public/orders/${id}/cancel`, data),
};