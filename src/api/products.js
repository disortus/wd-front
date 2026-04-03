import client from "./client.js";

export const productsApi = {
  // GET /api/public/products
  getList: (params = {}) => client.get("/public/products", { params }),

  // GET /api/public/products/:slug
  getBySlug: (slug) => client.get(`/public/products/${encodeURIComponent(slug)}`),

  // GET /api/public/catalog/tree
  getCatalogTree: () => client.get("/public/catalog/tree"),

  // Admin: GET /api/admin/products
  getAdminList: (params = {}) => client.get("/admin/products", { params }),

  // Admin: POST /api/admin/products
  create: (data) => client.post("/admin/products", data),

  // Admin: PATCH /api/admin/products/:id
  update: (id, data) => client.patch(`/admin/products/${id}`, data),

  // Admin: DELETE /api/admin/products/:id
  delete: (id) => client.delete(`/admin/products/${id}`),
};