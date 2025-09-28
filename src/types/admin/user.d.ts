export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'client';
  createdAt?: string;
  updatedAt?: string;
}

export interface UserQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  role?: string;
}
