// src/utils/permissions.js

export const getRolePermissions = (role) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return {
        canView: true,
        canCreate: true,
        canEdit: true,
        canDelete: true,
      };
    case 'manager':
      return {
        canView: true,
        canCreate: false,
        canEdit: true,
        canDelete: false,
      };
    case 'operator':
      return {
        canView: true,
        canCreate: false,
        canEdit: false,
        canDelete: false,
      };
    default:
      return {
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
      };
  }
};

