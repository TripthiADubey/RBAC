export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: boolean;
  permissions: string[];
}

