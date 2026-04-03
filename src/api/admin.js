import client from "./client.js";

export const adminApi = {
  // Users
  getUsers: (params = {}) => client.get("/admin/users", { params }),
  getUser: (id) => client.get(`/admin/users/${id}`),
  createUser: (data) => client.post("/admin/users", data),
  updateUser: (id, data) => client.patch(`/admin/users/${id}`, data),
  toggleUser: (id) => client.patch(`/admin/users/${id}/toggle`),
  deleteUser: (id) => client.delete(`/admin/users/${id}`),
  getUsersByRole: (role) => client.get(`/admin/users/role/${role}`),
  getUserStats: () => client.get("/admin/users/stats"),

  // Catalog
  getCatalogStructure: () => client.get("/admin/catalog/structure"),
  getCategories: () => client.get("/admin/catalog"),
  seedCatalog: () => client.post("/admin/catalog/seed"),
  toggleCategory: (id) =>
    client.patch(`/admin/catalog/categories/${id}/toggle`),
  toggleSubcategory: (id) =>
    client.patch(`/admin/catalog/subcategories/${id}/toggle`),

  // Products
  getProducts: (params = {}) => client.get("/admin/products", { params }),
  createProduct: (data) => client.post("/admin/products", data),
  updateProduct: (id, data) => client.patch(`/admin/products/${id}`, data),
  increaseStock: (id, quantity) =>
    client.patch(`/admin/products/${id}/increase-stock`, { quantity }),
  decreaseStock: (id, quantity) =>
    client.patch(`/admin/products/${id}/decrease-stock`, { quantity }),
  deleteProduct: (id) => client.delete(`/admin/products/${id}`),
};