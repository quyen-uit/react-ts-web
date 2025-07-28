import { Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AppBar from './NavBar.style';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

interface NavBarProps {
  open: boolean;
  isMobile: boolean;
  handleDrawerToggle: () => void;
}

export default function NavBar({
  open,
  isMobile,
  handleDrawerToggle,
}: NavBarProps) {
  return (
    <AppBar position="fixed" open={!isMobile && open}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <IconButton sx={{ color: 'common.white' }}>
            <Notifications />
          </IconButton>
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
