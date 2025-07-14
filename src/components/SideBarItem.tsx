import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

interface SideBarItemProps {
  open: boolean;
  to: string;
  icon: React.ReactElement;
  text: string;
}

const SideBarItem = ({ open, to, icon, text }: SideBarItemProps) => {
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={NavLink}
        to={to}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
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
