export interface Product {
  id: number;
  name: string;
  price: number;
  photoUrl?: string;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  notes?: string;
}
