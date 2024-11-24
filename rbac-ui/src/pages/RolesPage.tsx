import React, { useEffect, useState } from 'react';
import RolesTable from '../components/Rolestable';
import RoleModal from '../components/Modals/RoleModal';
import PermissionModal from '../components/Modals/PermissionModal';
import { fetchRoles, createRole, updateRole, deleteRole } from '../services/api';
import { Role } from '../type';

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);
  const [isPermissionModalOpen, setPermissionModalOpen] = useState(false);

  useEffect(() => {
    fetchRoles().then((response) => setRoles(response.data));
  }, []);

  const handleAddRole = () => {
    setSelectedRole(null);
    setRoleModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setRoleModalOpen(true);
  };

  const handleSaveRole = (role: Omit<Role, 'id'> | Partial<Role>) => {
    if (selectedRole) {
      // Update existing role
      updateRole(selectedRole.id, role).then((response) => {
        setRoles((prev) =>
          prev.map((r) => (r.id === selectedRole.id ? response.data : r))
        );
        setRoleModalOpen(false);
      });
    } else {
      // Create a new role
      createRole(role as Omit<Role, 'id'>).then((response) => {
        setRoles((prev) => [...prev, response.data]);
        setRoleModalOpen(false);
      });
    }
  };

  const handleDeleteRole = (id: number) => {
    deleteRole(id).then(() => setRoles((prev) => prev.filter((role) => role.id !== id)));
  };

  const handleManagePermissions = (role: Role) => {
    setSelectedRole(role);
    setPermissionModalOpen(true);
  };

  const handleSavePermissions = (updatedPermissions: { role: Role; permissions: string[] }) => {
    if (updatedPermissions.role) {
      setRoles((prev) =>
        prev.map((role) =>
          role.id === updatedPermissions.role.id
            ? { ...role, permissions: updatedPermissions.permissions }
            : role
        )
      );
      setPermissionModalOpen(false); // Close the modal
    }
  };


  return (
    <div>
      <h1>Role Management</h1>
      <button
        onClick={handleAddRole}
        style={{
          marginBottom: '1rem',
          padding: '10px 15px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add Role
      </button>
      <RolesTable
        roles={roles}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
        onManagePermissions={handleManagePermissions} // Pass the prop
      />
      <RoleModal
        open={isRoleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        onSave={handleSaveRole}
        existingRole={selectedRole || undefined} // Convert null to undefined
      />
      <PermissionModal
        open={isPermissionModalOpen}
        onClose={() => setPermissionModalOpen(false)}
        onSave={handleSavePermissions}
        role={selectedRole}
      />


    </div>
  );
};

export default RolesPage;
