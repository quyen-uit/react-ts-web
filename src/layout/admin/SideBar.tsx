import {
  Dashboard as DashboardIcon,
  Inventory,
  Login,
  People,
  Settings,
} from '@mui/icons-material';
import { List, Toolbar, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled, type Theme, type CSSObject } from '@mui/material/styles';

import SideBarItem from './SideBarItem';
import { type SidebarItemConfig } from './SideBarItem';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
  }),
}));

const sidebarItems: SidebarItemConfig[] = [
  {
    to: '/',
    icon: <DashboardIcon />,
    text: 'Dashboard',
  },
  {
    text: 'Master Data',
    icon: <Settings />,
    children: [
      {
        to: '/products',
        icon: <Inventory />,
        text: 'Products',
      },
      {
        to: '/users',
        icon: <People />,
        text: 'Users',
      },
    ],
  },
  {
    to: '/login',
    icon: <Login />,
    text: 'Login',
  },
];

interface SideBarProps {
  open: boolean;
  isMobile: boolean;
  handleDrawerClose: () => void;
}

export default function SideBar({ open, isMobile, handleDrawerClose }: SideBarProps) {
  const drawerContent = (
    <>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <img src="/vite.svg" alt="logo" style={{ width: 40, height: 40 }} />
        {open && (
          <Typography variant="h6" sx={{ ml: 2 }}>
            Mantis
          </Typography>
        )}
      </Toolbar>
      <List sx={{ mt: 2 }}>
        {sidebarItems.map((item, index) => (
          <SideBarItem
            key={index}
            open={open}
            to={item.to}
            icon={item.icon}
            text={item.text}
            children={item.children}
          />
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile ? (
        <MuiDrawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </MuiDrawer>
      ) : (
        <Drawer variant="permanent" open={open}>
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
