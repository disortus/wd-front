import client from "./client.js";

export const adminApi = {
  // Analytics
  getSalesAnalytics: (params) => client.get("/admin/analytics/sales", { params }),
  getStaffMetrics: () => client.get("/admin/analytics/staff"),
  getSystemOverview: () => client.get("/admin/analytics/overview"),

  // Users
  getUsers: (params) => client.get("/admin/users", { params }),
  getUser: (id) => client.get(`/admin/users/${id}`),
  createUser: (data) => client.post("/admin/users", data),
  updateUser: (id, data) => client.patch(`/admin/users/${id}`, data),
  deleteUser: (id) => client.delete(`/admin/users/${id}`),
  toggleUserActive: (id) => client.patch(`/admin/users/${id}/toggle`),
  getUserStats: () => client.get("/admin/users/stats"),

  // Staff Management (only staff, not regular users)
  getStaff: (params) => client.get("/admin/users/staff", { params }),
  deleteStaff: (id, permanent = false) => client.delete(`/admin/users/${id}/staff?permanent=${permanent}`),

  // Products
  getProducts: (params) => client.get("/admin/products", { params }),
  getProduct: (id) => client.get(`/admin/products/${id}`),
  createProduct: (data) => client.post("/admin/products", data),
  updateProduct: (id, data) => client.patch(`/admin/products/${id}`, data),
  deleteProduct: (id) => client.delete(`/admin/products/${id}`),

  // Product Images (upload new images)
  uploadProductImages: (id, formData) =>
    client.post(`/admin/products/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Product Images (delete specific image by index)
  deleteProductImage: (id, imageIndex) =>
    client.delete(`/admin/products/${id}/images/${imageIndex}`),

  // Stock Management
  increaseStock: (id, quantity) =>
    client.patch(`/admin/products/${id}/increase-stock`, { quantity }),

  decreaseStock: (id, quantity) =>
    client.patch(`/admin/products/${id}/decrease-stock`, { quantity }),

  // Catalog
  getCatalog: () => client.get("/admin/catalog"),
  getCategories: () => client.get("/admin/catalog"),
  createCategory: (data) => client.post("/admin/catalog", data),
  updateCategory: (id, data) => client.patch(`/admin/catalog/${id}`, data),
  deleteCategory: (id) => client.delete(`/admin/catalog/${id}`),
  toggleCategory: (id) => client.patch(`/admin/catalog/categories/${id}/toggle`),
  toggleSubcategory: (id) => client.patch(`/admin/catalog/subcategories/${id}/toggle`),
  getSubcategories: (categoryId) => client.get(`/admin/catalog/${categoryId}/subcategories`),
  createSubcategory: (categoryId, data) => client.post(`/admin/catalog/${categoryId}/subcategories`, data),
  updateSubcategory: (id, data) => client.patch(`/admin/catalog/subcategories/${id}`, data),
  deleteSubcategory: (id) => client.delete(`/admin/catalog/subcategories/${id}`),
  seedCatalog: () => client.post("/admin/catalog/seed"),
};

export default adminApi;
