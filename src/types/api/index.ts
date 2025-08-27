// API Response Types

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  category: string;
  description?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'client';
  createdAt?: string;
  updatedAt?: string;
}

// Permission Types
export interface Permission {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

// API Query Parameters
export interface ProductQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  category?: string;
}

export interface UserQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  role?: string;
}
