import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Chip, Box } from '@mui/material';
import { Role } from '../../type';

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (role: Omit<Role, 'id'> | Partial<Role>) => void;
  existingRole?: Role;
}

const RoleModal: React.FC<RoleModalProps> = ({ open, onClose, onSave, existingRole }) => {
  const [role, setRole] = useState<Omit<Role, 'id'>>({ name: '', permissions: [] });
  const [permissionInput, setPermissionInput] = useState('');

  useEffect(() => {
    if (existingRole) {
      setRole({ name: existingRole.name, permissions: existingRole.permissions });
    } else {
      setRole({ name: '', permissions: [] });
    }
  }, [existingRole]);

  const handleAddPermission = () => {
    if (permissionInput && !role.permissions.includes(permissionInput)) {
      setRole({ ...role, permissions: [...role.permissions, permissionInput] });
      setPermissionInput('');
    }
  };

  const handleRemovePermission = (permission: string) => {
    setRole({
      ...role,
      permissions: role.permissions.filter((perm) => perm !== permission),
    });
  };

  const handleSave = () => {
    onSave(role);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{existingRole ? 'Edit Role' : 'Add Role'}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Role Name"
          fullWidth
          margin="normal"
          value={role.name}
          onChange={(e) => setRole({ ...role, name: e.target.value })}
        />
        <TextField
          name="permission"
          label="Add Permission"
          fullWidth
          margin="normal"
          value={permissionInput}
          onChange={(e) => setPermissionInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddPermission()}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
          {role.permissions.map((permission) => (
            <Chip
              key={permission}
              label={permission}
              onDelete={() => handleRemovePermission(permission)}
              color="primary"
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleModal;
