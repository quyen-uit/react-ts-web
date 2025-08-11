import { Box, Button, Divider, List, Typography } from '@mui/material';

import type { OrderItem as OrderItemType } from '@/types/admin/pos';

import OrderItem from './OrderItem';

interface OrderPanelProps {
  orderItems: OrderItemType[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const OrderPanel = ({ orderItems, onUpdateQuantity }: OrderPanelProps) => {
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Box sx={{ width: '350px', p: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6">Table #12</Typography>
      <List>
        {orderItems.map((item) => (
          <OrderItem
            key={item.product.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Subtotal</Typography>
        <Typography>${subtotal.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Tax (10%)</Typography>
        <Typography>${tax.toFixed(2)}</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">${total.toFixed(2)}</Typography>
      </Box>
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        Place Order
      </Button>
    </Box>
  );
};

export default OrderPanel;
