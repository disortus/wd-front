import { create } from "zustand";
import { cartApi } from "../api/cart.js";

const useCartStore = create((set) => ({
  cart: null,
  isLoading: false,
  error: null,

  // Fetch cart
  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.getCart();
      set({ cart: data.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Add to cart
  addToCart: async (productId, quantity, attributes) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.addToCart({
        productId,
        quantity,
        attributes,
      });
      set({ cart: data.data, isLoading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Ошибка добавления в корзину";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Update cart item
  updateCartItem: async (productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.updateCartItem(productId, { quantity });
      set({ cart: data.data, isLoading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Ошибка обновления";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Remove from cart
  removeFromCart: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.removeFromCart(productId);
      set({ cart: data.data, isLoading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Ошибка удаления";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Clear cart
  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await cartApi.clearCart();
      set({ cart: data.data, isLoading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Ошибка очистки";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useCartStore;