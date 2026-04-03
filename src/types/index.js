// Role types
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator",
  COURIER: "courier",
  SUPPORT: "support",
};

// Order status types (matching backend ORDER_STATUS_TYPES)
export const ORDER_STATUS = {
  CREATED: "created",
  ACCEPTED_BY_MODERATOR: "accepted_by_moderator",
  PACKED: "packed",
  ASSIGNED_TO_COURIER: "assigned_to_courier",
  IN_DELIVERY: "in_delivery",
  DELIVERED: "delivered",
  CANCELED: "canceled",
};

// Ticket status types (matching backend TICKET_STATUS_TYPES)
export const TICKET_STATUS = {
  OPEN: "open",
  ASSIGNED: "assigned",
  RESOLVED: "resolved",
  CLOSED: "closed",
};

// Ticket priority types
export const TICKET_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

// Order status display mapping
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.CREATED]: "Заказ создан",
  [ORDER_STATUS.ACCEPTED_BY_MODERATOR]: "Принят модератором",
  [ORDER_STATUS.PACKED]: "Упакован",
  [ORDER_STATUS.ASSIGNED_TO_COURIER]: "Назначен курьеру",
  [ORDER_STATUS.IN_DELIVERY]: "В доставке",
  [ORDER_STATUS.DELIVERED]: "Доставлен",
  [ORDER_STATUS.CANCELED]: "Отменен",
};

// Order status color mapping
export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.CREATED]: "gray",
  [ORDER_STATUS.ACCEPTED_BY_MODERATOR]: "blue",
  [ORDER_STATUS.PACKED]: "indigo",
  [ORDER_STATUS.ASSIGNED_TO_COURIER]: "yellow",
  [ORDER_STATUS.IN_DELIVERY]: "orange",
  [ORDER_STATUS.DELIVERED]: "green",
  [ORDER_STATUS.CANCELED]: "red",
};

// Ticket status display mapping
export const TICKET_STATUS_LABELS = {
  [TICKET_STATUS.OPEN]: "Открыт",
  [TICKET_STATUS.ASSIGNED]: "В работе",
  [TICKET_STATUS.RESOLVED]: "Решен",
  [TICKET_STATUS.CLOSED]: "Закрыт",
};

// Ticket status color mapping
export const TICKET_STATUS_COLORS = {
  [TICKET_STATUS.OPEN]: "red",
  [TICKET_STATUS.ASSIGNED]: "yellow",
  [TICKET_STATUS.RESOLVED]: "green",
  [TICKET_STATUS.CLOSED]: "gray",
};

// Ticket priority display mapping
export const TICKET_PRIORITY_LABELS = {
  [TICKET_PRIORITY.LOW]: "Низкий",
  [TICKET_PRIORITY.MEDIUM]: "Средний",
  [TICKET_PRIORITY.HIGH]: "Высокий",
  [TICKET_PRIORITY.URGENT]: "Срочный",
};

// Ticket priority color mapping
export const TICKET_PRIORITY_COLORS = {
  [TICKET_PRIORITY.LOW]: "green",
  [TICKET_PRIORITY.MEDIUM]: "yellow",
  [TICKET_PRIORITY.HIGH]: "orange",
  [TICKET_PRIORITY.URGENT]: "red",
};

// Navigation items by role
export const DASHBOARD_NAV = {
  [ROLES.USER]: [
    { label: "Профиль", path: "/profile" },
    { label: "Мои заказы", path: "/profile/orders" },
    { label: "Мои обращения", path: "/profile/tickets" },
    { label: "Текущие доставки", path: "/profile/tracking" },
  ],
  [ROLES.ADMIN]: [
    { label: "Дашборд", path: "/admin" },
    { label: "Пользователи", path: "/admin/users" },
    { label: "Каталог", path: "/admin/catalog" },
    { label: "Товары", path: "/admin/products" },
  ],
  [ROLES.MODERATOR]: [
    { label: "Дашборд", path: "/moderator" },
    { label: "Заказы", path: "/moderator/orders" },
    { label: "Склад", path: "/moderator/products" },
  ],
  [ROLES.COURIER]: [
    { label: "Дашборд", path: "/courier" },
    { label: "Доступные заказы", path: "/courier/available" },
    { label: "Мои заказы", path: "/courier/orders" },
  ],
  [ROLES.SUPPORT]: [
    { label: "Дашборд", path: "/support" },
    { label: "Открытые тикеты", path: "/support/open" },
    { label: "Мои тикеты", path: "/support/tickets" },
  ],
};

export const ROLE_LABELS = {
  [ROLES.USER]: "Клиент",
  [ROLES.ADMIN]: "Администратор",
  [ROLES.MODERATOR]: "Модератор",
  [ROLES.COURIER]: "Курьер",
  [ROLES.SUPPORT]: "Поддержка",
};