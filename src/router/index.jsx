/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import PanelLayout from "../layouts/PanelLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import PageSkeleton from "../components/skeletons/PageSkeleton.jsx";
import { ROLES } from "../types/index.js";

// Lazy load pages
const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("../pages/RegisterPage.jsx"));
const ProductsPage = lazy(() => import("../pages/ProductsPage.jsx"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage.jsx"));
const CatalogPage = lazy(() => import("../pages/CatalogPage.jsx"));
const CartPage = lazy(() => import("../pages/CartPage.jsx"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage.jsx"));
const ProfilePage = lazy(() => import("../pages/ProfilePage.jsx"));
const CreateSupportTicketPage = lazy(() => import("../pages/CreateSupportTicketPage.jsx"));

const AdminDashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const AdminUsers = lazy(() => import("../pages/admin/Users.jsx"));
const AdminCatalog = lazy(() => import("../pages/admin/Catalog.jsx"));
const AdminProducts = lazy(() => import("../pages/admin/Products.jsx"));

const ModeratorDashboard = lazy(() => import("../pages/moderator/Dashboard.jsx"));
const ModeratorOrders = lazy(() => import("../pages/moderator/Orders.jsx"));

const CourierDashboard = lazy(() => import("../pages/courier/Dashboard.jsx"));
const CourierOrders = lazy(() => import("../pages/courier/Orders.jsx"));

const SupportDashboard = lazy(() => import("../pages/support/Dashboard.jsx"));
const SupportOpenTickets = lazy(() => import("../pages/support/OpenTickets.jsx"));
const SupportMyTickets = lazy(() => import("../pages/support/MyTickets.jsx"));

function LazyPage({ children }) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LazyPage><HomePage /></LazyPage> },
      { path: "/products", element: <LazyPage><ProductsPage /></LazyPage> },
      { path: "/products/:slug", element: <LazyPage><ProductDetailPage /></LazyPage> },
      { path: "/catalog", element: <LazyPage><CatalogPage /></LazyPage> },
      { path: "/cart", element: <LazyPage><ProtectedRoute><CartPage /></ProtectedRoute></LazyPage> },
      { path: "/checkout", element: <LazyPage><ProtectedRoute><CheckoutPage /></ProtectedRoute></LazyPage> },
      { path: "/profile", element: <LazyPage><ProtectedRoute><ProfilePage /></ProtectedRoute></LazyPage> },
      { path: "/support/create", element: <LazyPage><ProtectedRoute><CreateSupportTicketPage /></ProtectedRoute></LazyPage> },
    ],
  },
  { path: "/login", element: <LazyPage><LoginPage /></LazyPage> },
  { path: "/register", element: <LazyPage><RegisterPage /></LazyPage> },
  {
    path: "/admin",
    element: <ProtectedRoute requireRole={ROLES.ADMIN}><PanelLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <LazyPage><AdminDashboard /></LazyPage> },
      { path: "/admin/users", element: <LazyPage><AdminUsers /></LazyPage> },
      { path: "/admin/catalog", element: <LazyPage><AdminCatalog /></LazyPage> },
      { path: "/admin/products", element: <LazyPage><AdminProducts /></LazyPage> },
    ],
  },
  {
    path: "/moderator",
    element: <ProtectedRoute requireRole={ROLES.MODERATOR}><PanelLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <LazyPage><ModeratorDashboard /></LazyPage> },
      { path: "/moderator/orders", element: <LazyPage><ModeratorOrders /></LazyPage> },
    ],
  },
  {
    path: "/courier",
    element: <ProtectedRoute requireRole={ROLES.COURIER}><PanelLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <LazyPage><CourierDashboard /></LazyPage> },
      { path: "/courier/available", element: <LazyPage><CourierOrders available /></LazyPage> },
      { path: "/courier/orders", element: <LazyPage><CourierOrders /></LazyPage> },
    ],
  },
  {
    path: "/support",
    element: <ProtectedRoute requireRole={ROLES.SUPPORT}><PanelLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <LazyPage><SupportDashboard /></LazyPage> },
      { path: "/support/open", element: <LazyPage><SupportOpenTickets /></LazyPage> },
      { path: "/support/tickets", element: <LazyPage><SupportMyTickets /></LazyPage> },
    ],
  },
]);

export default router;