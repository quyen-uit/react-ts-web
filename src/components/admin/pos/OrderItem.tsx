import { Add, Remove } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import type { OrderItem } from '@/types/admin/pos';

interface OrderItemProps {
  item: OrderItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const OrderItem = ({ item, onUpdateQuantity }: OrderItemProps) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={item.product.photoUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={item.product.name}
        secondary={`$${item.product.price.toFixed(2)}`}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
        >
          <Remove />
        </IconButton>
        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
        >
          <Add />
        </IconButton>
      </Box>
      <Typography sx={{ ml: 2 }}>
        ${(item.product.price * item.quantity).toFixed(2)}
      </Typography>
    </ListItem>
  );
};

export default OrderItem;
