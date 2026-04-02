import client from "./client.js";

export const supportApi = {
  // User tickets
  // POST /api/public/tickets
  createTicket: (data) => client.post("/public/tickets", data),

  // Support panel
  // GET /api/support/tickets
  getMyTickets: (params = {}) => client.get("/support/tickets", { params }),

  // GET /api/support/tickets/open
  getOpenTickets: (params = {}) => client.get("/support/tickets/open", { params }),

  // GET /api/support/tickets/stats
  getStats: () => client.get("/support/tickets/stats"),

  // GET /api/support/tickets/:id
  getTicket: (id) => client.get(`/support/tickets/${id}`),

  // POST /api/support/tickets/:id/accept
  acceptTicket: (id) => client.post(`/support/tickets/${id}/accept`),

  // POST /api/support/tickets/:id/release
  releaseTicket: (id) => client.post(`/support/tickets/${id}/release`),

  // POST /api/support/tickets/:id/message
  addMessage: (id, data) =>
    client.post(`/support/tickets/${id}/message`, data),

  // POST /api/support/tickets/:id/resolve
  resolveTicket: (id) => client.post(`/support/tickets/${id}/resolve`),

  // POST /api/support/tickets/:id/close
  closeTicket: (id) => client.post(`/support/tickets/${id}/close`),

  // POST /api/support/tickets/:id/reopen
  reopenTicket: (id, data) =>
    client.post(`/support/tickets/${id}/reopen`, data),
};