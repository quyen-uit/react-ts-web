import {
  History,
  Home,
  Notifications,
  Search,
  ShoppingCart,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Avatar sx={{ mr: 2 }}>C</Avatar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mr. Chad
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Search />
          <InputBase placeholder="Search menu, order, bills..." />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <Home />
          <Typography>Home</Typography>
        </IconButton>
        <IconButton color="inherit">
          <ShoppingCart />
          <Typography>Orders</Typography>
        </IconButton>
        <IconButton color="inherit">
          <History />
          <Typography>History</Typography>
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <Avatar sx={{ ml: 2 }}>U</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
