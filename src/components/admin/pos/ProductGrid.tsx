import { Grid } from '@mui/material';

import type { Product } from '@/types/admin/pos';

import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductGrid = ({ products, onSelectProduct }: ProductGridProps) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        mt: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </Grid>
  );
};

export default ProductGrid;
