// Роли пользователя (значения совпадают с бэкендом server.vagclub21, верхний регистр).
export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
};

// Роли, дающие доступ в админку.
export const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPERADMIN];

// Есть ли у набора ролей доступ в админку.
export const hasAdminAccess = (roles) =>
  Array.isArray(roles) && roles.some((r) => ADMIN_ROLES.includes(r));

// Является ли супер-администратором (может назначать роли).
export const isSuperadmin = (roles) =>
  Array.isArray(roles) && roles.includes(ROLES.SUPERADMIN);
