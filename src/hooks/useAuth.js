import { useEffect } from "react";
import useAuthStore from "../store/authStore.js";

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    hasInitialized,
    initialize,
    logout,
    login,
    register,
    forceLogout,
  } = useAuthStore();

  useEffect(() => {
    if (!hasInitialized && !isLoading) {
      initialize();
    }
  }, [hasInitialized, initialize, isLoading]);

  useEffect(() => {
    const onUnauthorized = () => {
      forceLogout();
    };

    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, [forceLogout]);

  const hasRole = (roles) => {
    if (!user) return false;

    const roleList = Array.isArray(roles)
      ? roles
      : [roles];

    return roleList.includes(user.role);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    hasInitialized,
    login,
    register,
    logout,
    hasRole,
    role: user?.role,
  };
}