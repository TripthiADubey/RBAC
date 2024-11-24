import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import UserModal from '../components/Modals/UserModal';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/api';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isUserModalOpen, setUserModalOpen] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers().then((response) => setUsers(response.data));
  }, []);

  // Handle opening the modal for adding a new user
  const handleAddUser = () => {
    setSelectedUser(null);
    setUserModalOpen(true);
  };

  // Handle opening the modal for editing an existing user
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  // Handle saving (adding/editing) a user
  const handleSaveUser = (user: any) => {
    if (selectedUser) {
      // Update the existing user
      updateUser(selectedUser.id, user).then(() => {
        setUsers((prev) =>
          prev.map((u) => (u.id === selectedUser.id ? { ...u, ...user } : u))
        );
        setUserModalOpen(false);
      });
    } else {
      // Create a new user
      createUser(user).then((response) => {
        setUsers((prev) => [...prev, response.data]);
        setUserModalOpen(false);
      });
    }
  };

  // Handle deleting a user
  const handleDeleteUser = (id: number) => {
    deleteUser(id).then(() => setUsers((prev) => prev.filter((user) => user.id !== id)));
  };

  return (
    <div>
      <h1>User Management</h1>
      <button
        onClick={handleAddUser}
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
        Add User
      </button>
      <UsersTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <UserModal
        open={isUserModalOpen}
        onClose={() => setUserModalOpen(false)}
        onSave={handleSaveUser}
        existingUser={selectedUser}
      />
    </div>
  );
};

export default UsersPage;
