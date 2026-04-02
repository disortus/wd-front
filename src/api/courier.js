import client from "./client.js";

export const courierApi = {
  // GET /api/courier/orders
  getMyOrders: (params = {}) => client.get("/courier/orders", { params }),

  // GET /api/courier/orders/available
  getAvailableOrders: (params = {}) =>
    client.get("/courier/orders/available", { params }),

  // GET /api/courier/orders/stats
  getStats: () => client.get("/courier/orders/stats"),

  // GET /api/courier/orders/:id
  getOrder: (id) => client.get(`/courier/orders/${id}`),

  // POST /api/courier/orders/:id/accept
  acceptOrder: (id) => client.post(`/courier/orders/${id}/accept`),

  // POST /api/courier/orders/:id/start
  startDelivery: (id, data) =>
    client.post(`/courier/orders/${id}/start`, data),

  // POST /api/courier/orders/:id/delivered
  markDelivered: (id, data) =>
    client.post(`/courier/orders/${id}/delivered`, data),

  // PATCH /api/courier/orders/:id/status
  updateDeliveryStatus: (id, data) =>
    client.patch(`/courier/orders/${id}/status`, data),
};