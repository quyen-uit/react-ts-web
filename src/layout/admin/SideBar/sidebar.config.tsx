import {
  Dashboard as DashboardIcon,
  Inventory,
  Login,
  People,
  Settings,
} from '@mui/icons-material';
import { t } from 'i18next';

import { type SidebarItemConfig } from '../SideBarItem/SideBarItem';

const sidebarItems: SidebarItemConfig[] = [
  {
    to: '/admin',
    icon: <DashboardIcon />,
    text: t('sidebar.dashboard'),
  },
  {
    text: t('sidebar.master_data'),
    icon: <Settings />,
    children: [
      {
        to: '/admin/products',
        icon: <Inventory />,
        text: t('sidebar.products'),
      },
      {
        to: '/admin/users',
        icon: <People />,
        text: t('sidebar.users'),
      },
      {
        to: '/admin/permissions',
        icon: <People />,
        text: t('sidebar.permissions'),
      },
    ],
  },
  {
    text: t('sidebar.test'),
    icon: <Settings />,
    children: [
      {
        to: '/admin/products',
        icon: <Inventory />,
        text: t('sidebar.test'),
      },
      {
        to: '/admin/users',
        icon: <People />,
        text: t('sidebar.test'),
      },
    ],
  },
  {
    to: '/login',
    icon: <Login />,
    text: t('sidebar.login'),
  },
];

export default sidebarItems;
