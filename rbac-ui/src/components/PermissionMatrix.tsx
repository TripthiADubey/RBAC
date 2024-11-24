import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';

interface PermissionMatrixProps {
  roles: { id: number; name: string; permissions: string[] }[];
  permissions: string[];
  onUpdate: (roleId: number, permission: string, value: boolean) => void;
}

const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ roles, permissions, onUpdate }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Role</TableCell>
          {permissions.map((permission) => (
            <TableCell key={permission}>{permission}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell>{role.name}</TableCell>
            {permissions.map((permission) => (
              <TableCell key={permission}>
                <Checkbox
                  checked={role.permissions.includes(permission)}
                  onChange={(e) => onUpdate(role.id, permission, e.target.checked)}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PermissionMatrix;
