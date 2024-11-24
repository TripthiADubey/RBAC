import React, { useEffect, useState } from 'react';
import PermissionMatrix from '../components/PermissionMatrix';
import { fetchRoles, updateRole } from '../services/api';
import { Role } from '../type'; // Import Role interface

const PermissionsPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const permissions = ['Read', 'Write', 'Delete'];

  useEffect(() => {
    fetchRoles().then((response) => setRoles(response.data));
  }, []);

  const handlePermissionUpdate = (roleId: number, permission: string, value: boolean) => {
    const role = roles.find((r) => r.id === roleId);
    if (role) {
      const updatedPermissions = value
        ? [...role.permissions, permission]
        : role.permissions.filter((perm) => perm !== permission);

      const updatedRole: Role = { ...role, permissions: updatedPermissions };

      updateRole(roleId, updatedRole).then((response) => {
        setRoles((prev) =>
          prev.map((r) => (r.id === roleId ? response.data : r))
        );
      });
    }
  };

  return (
    <div>
      <h1>Permission Management</h1>
      <PermissionMatrix
        roles={roles}
        permissions={permissions}
        onUpdate={handlePermissionUpdate}
      />
    </div>
  );
};

export default PermissionsPage;
