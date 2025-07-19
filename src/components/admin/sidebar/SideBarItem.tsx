import { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
  level?: number;
}

const SideBarItem = ({
  open,
  level = 0,
  to,
  icon,
  text,
  children: childItems,
}: SideBarItemProps) => {
  const indentation = level * 2.5 + 2;
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const handleSubMenuClick = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  if (childItems) {
    if (!open) {
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
              sx={{ opacity: open ? 1 : 0, ml: 2 }}
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
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, ml: 2 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
