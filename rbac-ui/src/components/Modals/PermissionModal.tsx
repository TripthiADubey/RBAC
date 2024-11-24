import React, { useState } from 'react';
import { Role } from '../../type';

interface PermissionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedPermissions: { role: Role; permissions: string[] }) => void;
  role: Role | null; // Receive the role prop
}

const PermissionModal: React.FC<PermissionModalProps> = ({ open, onClose, onSave, role }) => {
  const [permissions, setPermissions] = useState<string[]>(role?.permissions || []); // Set initial permissions

  const handlePermissionChange = (permission: string) => {
    // Toggle permission
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    if (role) {
      // Save the updated permissions
      onSave({ role, permissions });
    }
  };

  if (!open) return null; // Return nothing if the modal is not open

  return (
    <div style={{ position: 'fixed', top: '20%', left: '30%', width: '40%', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <h2>Manage Permissions</h2>
      <div>
        <h3>Permissions</h3>
        {['Read', 'Write', 'Delete'].map((perm) => (
          <div key={perm}>
            <label>
              <input
                type="checkbox"
                value={perm}
                checked={permissions.includes(perm)} // Show checked if the permission is in the array
                onChange={() => handlePermissionChange(perm)} // Handle permission change
              />
              {perm}
            </label>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSave} style={{ marginRight: '10px', backgroundColor: '#4caf50', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '5px' }}>Save</button>
        <button onClick={onClose} style={{ backgroundColor: '#f44336', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '5px' }}>Cancel</button>
      </div>
    </div>
  );
};

export default PermissionModal;

