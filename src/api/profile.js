import client from "./client.js";

export const profileApi = {
  // GET /api/profile/me
  getMe: () => client.get("/public/profile/me"),

  // PATCH /api/profile/me
  updateMe: (data) => client.patch("/public/profile/me", data),

  // GET /api/profile/orders
  getOrderHistory: (params = {}) => client.get("/public/profile/orders", { params }),

  // GET /api/profile/orders/active
  getActiveOrders: () => client.get("/public/profile/orders/active"),

  // GET /api/profile/orders/:orderId/tracking
  getOrderTracking: (orderId) => client.get(`/public/profile/orders/${orderId}/tracking`),

  // GET /api/profile/tickets
  getMyTickets: (params = {}) => client.get("/public/profile/tickets", { params }),

  // GET /api/profile/stats
  getStats: () => client.get("/public/profile/stats"),

  // POST /api/profile/addresses
  addAddress: (data) => client.post("/public/profile/addresses", data),

  // PATCH /api/profile/addresses/:addressId
  updateAddress: (addressId, data) =>
    client.patch(`/public/profile/addresses/${addressId}`, data),

  // DELETE /api/profile/addresses/:addressId
  deleteAddress: (addressId) =>
    client.delete(`/public/profile/addresses/${addressId}`),
};