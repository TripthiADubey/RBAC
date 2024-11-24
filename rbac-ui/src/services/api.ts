import axios from 'axios';
import { Role, User } from '../type';

const API_URL = 'http://localhost:3001';

export const fetchUsers = () => axios.get<User[]>(`${API_URL}/users`);
export const createUser = (user: Omit<User, 'id'>) => axios.post<User>(`${API_URL}/users`, user);
export const updateUser = (id: number, user: Partial<Omit<User, 'id'>>) => axios.put<User>(`${API_URL}/users/${id}`, user);
export const deleteUser = (id: number) => axios.delete(`${API_URL}/users/${id}`);

export const fetchRoles = () => axios.get<Role[]>(`${API_URL}/roles`);
export const createRole = (role: Omit<Role, 'id'>) => axios.post<Role>(`${API_URL}/roles`, role);
export const updateRole = (id: number, role: Partial<Omit<Role, 'id'>>) => axios.put<Role>(`${API_URL}/roles/${id}`, role);
export const deleteRole = (id: number) => axios.delete(`${API_URL}/roles/${id}`);
