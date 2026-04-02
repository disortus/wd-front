// src/hooks/useAuth.js

import { useEffect } from "react";
import useAuthStore from "../store/authStore";

export function useAuth() {

  const {
    user,
    isAuthenticated,
    isLoading,
    initialize,
    logout,
    login,
    register,
  } = useAuthStore();



  useEffect(() => {

    initialize();

  }, []);



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

    login,
    register,
    logout,

    hasRole,
    role: user?.role,

  };

}