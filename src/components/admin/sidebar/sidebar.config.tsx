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
    to: '/admin',
    icon: <DashboardIcon />,
    text: 'Dashboard',
  },
  {
    text: 'Master Data',
    icon: <Settings />,
    children: [
      {
        to: '/admin/products',
        icon: <Inventory />,
        text: 'Products',
      },
      {
        to: '/admin/users',
        icon: <People />,
        text: 'Users',
      },
      {
        to: '/admin/permissions',
        icon: <People />,
        text: 'Permissions',
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
