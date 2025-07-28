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
  isMobile?: boolean;
  handleDrawerClose?: () => void;
}

export interface SideBarItemProps extends SidebarItemConfig {
  open: boolean;
  level?: number;
}

const SideBarItem = ({
  open,
  level = 0,
  to,
  icon,
  text,
  isMobile,
  children: childItems,
  handleDrawerClose,
}: SideBarItemProps) => {
  const indentation = level * 2.5 + 2;
  const isMobileOpen = open || isMobile;

  const { pathname } = useLocation();

  const isChildActive =
    childItems &&
    childItems.some((child) => child.to && pathname.startsWith(child.to));

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(!!isChildActive);
  const handleSubMenuClick = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  if (childItems) {
    if (!isMobileOpen) {
      return (
        <List component="div" disablePadding>
          {childItems.map((child, index) => (
            <SideBarItem level={level} key={index} {...child} open={open} />
          ))}
        </List>
      );
    }
    return (
      <>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={handleSubMenuClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              pr: 2,
              pl: open ? indentation : 4,
              color: isChildActive ? 'primary.main' : 'inherit',
              '&:hover': {
                backgroundColor: 'sidebarAction.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                color: isChildActive ? 'primary.main' : 'inherit',
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ opacity: isMobileOpen ? 1 : 0, ml: 2 }}
            />
            {open && (isSubMenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        <Collapse in={open && isSubMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {childItems.map((child, index) => (
              <SideBarItem
                level={level + 1}
                key={index}
                {...child}
                open={open}
                handleDrawerClose={handleDrawerClose}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleDrawerClose}
        component={NavLink}
        to={to ?? ''}
        end
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          pr: 2,
          pl: open ? indentation : 4,
          '&.active': {
            backgroundColor: 'sidebarAction.selected',
            color: 'sidebarAction.active',
            borderRight: '4px solid',
            borderColor: 'active.dark',
            '& .MuiListItemIcon-root': {
              color: 'sidebarAction.active',
            },
          },
          '&:hover': {
            backgroundColor: 'sidebarAction.hover',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{ opacity: isMobileOpen ? 1 : 0, ml: 2 }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
