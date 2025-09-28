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

export interface ProductQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  category?: string;
}
