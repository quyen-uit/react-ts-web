import {
  Dashboard as DashboardIcon,
  Inventory,
  Login,
  People,
  Settings,
} from '@mui/icons-material';

import { type SidebarItemConfig } from './SideBarItem';

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

export default sidebarItems;
