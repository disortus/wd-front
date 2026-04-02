import client from "./client.js";

export const profileApi = {
  // GET /api/profile/me
  getMe: () => client.get("/profile/me"),

  // PATCH /api/profile/me
  updateMe: (data) => client.patch("/profile/me", data),

  // GET /api/profile/orders
  getOrderHistory: (params = {}) => client.get("/profile/orders", { params }),

  // GET /api/profile/orders/active
  getActiveOrders: () => client.get("/profile/orders/active"),

  // GET /api/profile/orders/:orderId/tracking
  getOrderTracking: (orderId) => client.get(`/profile/orders/${orderId}/tracking`),

  // GET /api/profile/tickets
  getMyTickets: (params = {}) => client.get("/profile/tickets", { params }),

  // GET /api/profile/stats
  getStats: () => client.get("/profile/stats"),

  // POST /api/profile/addresses
  addAddress: (data) => client.post("/profile/addresses", data),

  // PATCH /api/profile/addresses/:addressId
  updateAddress: (addressId, data) =>
    client.patch(`/profile/addresses/${addressId}`, data),

  // DELETE /api/profile/addresses/:addressId
  deleteAddress: (addressId) =>
    client.delete(`/profile/addresses/${addressId}`),
};