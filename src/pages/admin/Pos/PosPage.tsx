import { useState } from 'react';

import { Box } from '@mui/material';

import CategoryMenu from '@/components/admin/pos/CategoryMenu';
import Header from '@/components/admin/pos/Header';
import OrderPanel from '@/components/admin/pos/OrderPanel';
import ProductGrid from '@/components/admin/pos/ProductGrid';
import type { OrderItem, Product } from '@/types/admin/pos';

import { categories, products } from './pos.data';

const PosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Main');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setOrderItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.product.id !== productId);
      }
      return prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const handleSelectProduct = (product: Product) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'grey.100' }}>
      <CategoryMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content for Products */}
      <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
        <Header />
        <ProductGrid
          products={filteredProducts}
          onSelectProduct={handleSelectProduct}
        />
      </Box>

      {/* Right Sidebar for Order Summary */}
      <OrderPanel
        orderItems={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </Box>
  );
};

export default PosPage;
