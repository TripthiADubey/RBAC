import { Role } from '../type';

export interface RolesTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: number) => void;
  onManagePermissions?: (role: Role) => void; // Add this line
}

const RolesTable: React.FC<RolesTableProps> = ({ roles, onEdit, onDelete, onManagePermissions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Permissions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <tr key={role.id}>
            <td>{role.name}</td>
            <td>{role.permissions.join(', ')}</td>
            <td>
              <button onClick={() => onEdit(role)}>Edit</button>
              <button onClick={() => onDelete(role.id)}>Delete</button>
              {onManagePermissions && (
                <button onClick={() => onManagePermissions(role)}>
                  Manage Permissions
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RolesTable;
