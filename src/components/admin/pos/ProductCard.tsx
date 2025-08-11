import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import type { Product } from '@/types/admin/pos';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCard = ({ product, onSelectProduct }: ProductCardProps) => {
  return (
    <Card sx={{ borderRadius: 2, width: 200 }}>
      <CardActionArea onClick={() => onSelectProduct(product)}>
        <CardMedia
          component="img"
          height="140"
          image={product.photoUrl}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
