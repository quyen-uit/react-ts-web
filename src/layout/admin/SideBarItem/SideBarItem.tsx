import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem } from '@mui/material';

import {
  NavItemButton,
  StyledListItemIcon,
  StyledListItemText,
  SubMenuButton,
} from './SideBarItem.styles';

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
          <SubMenuButton
            onClick={handleSubMenuClick}
            open={open}
            level={level}
            isChildActive={isChildActive}
          >
            <StyledListItemIcon isChildActive={isChildActive}>
              {icon}
            </StyledListItemIcon>
            <StyledListItemText primary={text} open={isMobileOpen} />
            {open && (isSubMenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </SubMenuButton>
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
      <NavItemButton
        onClick={handleDrawerClose}
        component={NavLink}
        to={to ?? ''}
        end
        open={open}
        level={level}
      >
        <StyledListItemIcon>{icon}</StyledListItemIcon>
        <StyledListItemText primary={text} open={isMobileOpen} />
      </NavItemButton>
    </ListItem>
  );
};

export default SideBarItem;
