import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function ProtectedRoute({
  children,
  requireRole,
  requireAuth: requireAuthOnly = true,
}) {
  const { isAuthenticated, role, isLoading, hasInitialized } = useAuth();
  const location = useLocation();

  if (!hasInitialized || isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 mx-auto text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="mt-3 text-sm text-neutral-500">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && requireAuthOnly) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole) {
    const allowedRoles = Array.isArray(requireRole) ? requireRole : [requireRole];
    if (!isAuthenticated || !allowedRoles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}