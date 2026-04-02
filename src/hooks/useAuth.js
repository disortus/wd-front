import { useEffect } from "react";
import useAuthStore from "../store/authStore.js";

export function useAuth() {
  const { user, isAuthenticated, isLoading, initialize, logout } = useAuthStore();

  useEffect(() => {
    if (!user && isAuthenticated) {
      initialize();
    }
  }, [initialize, user, isAuthenticated]);

  const hasRole = (roles) => {
    if (!user) return false;
    const roleList = Array.isArray(roles) ? roles : [roles];
    return roleList.includes(user.role);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    hasRole,
    role: user?.role,
    logout,
  };
}