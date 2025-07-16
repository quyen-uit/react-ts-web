import { Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import ProfileMenu from './ProfileMenu';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: theme.drawerWidth,
    width: `calc(100% - ${theme.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7)} - 1px)`,
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.spacing(8)} - 1px)`,
      marginLeft: `calc(${theme.spacing(8)} + 1px)`,
    },
  }),
}));

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
