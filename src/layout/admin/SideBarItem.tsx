import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export interface SidebarItemConfig {
  to?: string;
  icon: React.ReactElement;
  text: string;
  children?: SidebarItemConfig[];
}

export interface SideBarItemProps extends SidebarItemConfig {
  open: boolean;
}

const SideBarItem = ({
  open,
  to,
  icon,
  text,
  children: childItems,
}: SideBarItemProps) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const location = useLocation();

  const handleSubMenuClick = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const isChildActive =
    childItems &&
    childItems.some((child) => child.to && location.pathname.startsWith(child.to));

  if (childItems) {
    return (
      <>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={handleSubMenuClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              ...(isChildActive && {
                bgcolor: 'action.selected',
              }),
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: 'primary.main',
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            {open && (isSubMenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        <Collapse in={open && isSubMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {childItems.map((child, index) => (
              <SideBarItem key={index} {...child} open={open} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={NavLink}
        to={to ?? ''}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          '&.active': {
            bgcolor: 'action.selected',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            color: 'primary.main',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
