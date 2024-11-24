import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { User } from '../../type'; 

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
  existingUser?: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, onSave, existingUser }) => {
  const [user, setUser] = useState<Partial<User>>(
    existingUser || { name: '', email: '', role: '', status: true }
  );
  

  useEffect(() => {
    if (existingUser) {
      setUser(existingUser);
    } else {
      setUser({ name: '', email: '', role: '', status: true });
    }
  }, [existingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleToggleStatus = () => {
    setUser((prev) => ({ ...prev, status: !prev.status }));
  };

  const handleSave = () => {
    onSave(user);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{existingUser ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="normal"
          value={user.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={user.email}
          onChange={handleChange}
        />
        <TextField
          name="role"
          label="Role"
          fullWidth
          margin="normal"
          value={user.role}
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Switch checked={user.status} onChange={handleToggleStatus} />}
          label="Active"
          style={{ marginTop: '1rem' }}
        />
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

export default UserModal;
