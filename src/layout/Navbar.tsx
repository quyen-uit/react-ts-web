import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import {
  Menu,
  Notifications,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface NavbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  toggleTheme: () => void;
}

const Navbar = ({ open, handleDrawerOpen, toggleTheme }: NavbarProps) => {
  const { i18n } = useTranslation();
  const theme = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Button color="inherit" onClick={() => changeLanguage('en')}>
            EN
          </Button>
          <Button color="inherit" onClick={() => changeLanguage('vi')}>
            VI
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
