import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  type ListItemButtonProps,
} from '@mui/material';
import type { NavLinkProps } from 'react-router-dom';

interface SubMenuButtonProps {
  open?: boolean;
  level?: number;
  isChildActive?: boolean;
}

type NavItemButtonProps = NavLinkProps &
  ListItemButtonProps & {
    open?: boolean;
    level?: number;
  };

export const SubMenuButton = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== 'open' && prop !== 'level' && prop !== 'isChildActive',
})<SubMenuButtonProps>(({ theme, open, level = 0, isChildActive }) => ({
  justifyContent: open ? 'initial' : 'center',
  paddingRight: theme.spacing(2),
  paddingLeft: open ? theme.spacing(level * 2.5 + 2) : theme.spacing(4),
  color: isChildActive ? theme.palette.primary.main : 'inherit',
  '&:hover': {
    backgroundColor: theme.palette.sidebarAction.hover,
  },
}));

export const NavItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'level',
})<NavItemButtonProps>(({ theme, open, level = 0 }) => ({
  justifyContent: open ? 'initial' : 'center',
  paddingRight: theme.spacing(2),
  paddingLeft: open ? theme.spacing(level * 2.5 + 2) : theme.spacing(4),
  '&.active': {
    backgroundColor: theme.palette.sidebarAction.selected,
    color: theme.palette.sidebarAction.active,
    borderRight: '4px solid',
    borderColor: theme.palette.primary.dark,
    '& .MuiListItemIcon-root': {
      color: theme.palette.sidebarAction.active,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.sidebarAction.hover,
  },
}));

export const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isChildActive',
})<{ isChildActive?: boolean }>(({ theme, isChildActive }) => ({
  minWidth: 0,
  justifyContent: 'center',
  color: isChildActive ? theme.palette.primary.main : theme.palette.grey[600],
}));

export const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  opacity: open ? 1 : 0,
  marginLeft: theme.spacing(2),
  '& .MuiTypography-root': {
    fontSize: theme.typography.fontSize
  }
}));
