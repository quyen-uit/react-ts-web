import type { Category, Product } from '@/types/admin/pos';

export const categories: Category[] = [
  { id: 1, name: 'Main', icon: '🍔' },
  { id: 2, name: 'Appetizer', icon: ' appetizers' },
  { id: 3, name: 'Desserts', icon: '🍰' },
  { id: 4, name: 'Snack', icon: '🍿' },
  { id: 5, name: 'Beverages', icon: '🍹' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Grilled Chicken Teriyaki',
    price: 9.5,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 2,
    name: 'Classic Beef Burger',
    price: 10.0,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 3,
    name: 'Creamy Mushroom Pasta',
    price: 11.5,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 4,
    name: 'Spicy Korean BBQ Ribs',
    price: 13.0,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 5,
    name: 'Butter Chicken with Naan',
    price: 12.0,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 6,
    name: 'Thai Green Curry with Tofu',
    price: 9.0,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 7,
    name: 'BBQ Pulled Pork Sandwich',
    price: 10.5,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 8,
    name: 'Herb-Crusted Salmon',
    price: 14.0,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/14.0',
  },
  {
    id: 9,
    name: 'Beef Bulgogi Rice Bowl',
    price: 11.0,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 10,
    name: 'Crispy Chicken Katsu',
    price: 10.0,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 11,
    name: 'Vegan Mediterranean Bowl',
    price: 8.0,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
  {
    id: 12,
    name: 'Nasi Goreng Special',
    price: 8.0,
    category: 'Main',
    photoUrl: 'https://via.placeholder.com/140',
  },
];
