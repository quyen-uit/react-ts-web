import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Notifications,
  AccountCircle,
  Brightness4,
  Brightness7,
  Translate,
  Settings,
  Person,
  WbSunny,
  NightsStay,
} from '@mui/icons-material';
import { useColorScheme } from '@mui/material/styles';
import {
  Box,
  ListItemIcon,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface HeaderProps {
  open: boolean;
  isMobile: boolean;
  handleDrawerToggle: () => void;
}

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Header({ open, isMobile, handleDrawerToggle }: HeaderProps) {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value === 'dark' ? 'dark' : 'light');
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <AppBar position="fixed" open={!isMobile && open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{
            marginRight: 5,
            ...(!isMobile && open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {i18n.t('greeting')}
        </Typography>
        <Box>
          <IconButton
            color="inherit"
            onClick={() => {
              setMode(mode === 'light' ? 'dark' : 'light');
            }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Person color="primary" />
              </ListItemIcon>
              <ListItemText primary={i18n.t('profile')} />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings color="primary" />
              </ListItemIcon>
              <ListItemText primary={i18n.t('settings')} />
            </MenuItem>
            <Divider />
            <Box sx={{ pl: 2, pr: 2 }}>
              <Typography variant="caption">{i18n.t('toggle_theme')}</Typography>
              <RadioGroup row aria-label="theme" name="theme" value={mode} onChange={handleThemeChange}>
                <FormControlLabel value="light" control={<Radio />} label={<WbSunny />} />
                <FormControlLabel value="dark" control={<Radio />} label={<NightsStay />} />
              </RadioGroup>
            </Box>
            <Divider />
            <Box sx={{ pl: 2, pr: 2 }}>
              <Typography variant="caption">{i18n.t('language')}</Typography>
              <RadioGroup
                row
                aria-label="language"
                name="language"
                value={i18n.language}
                onChange={handleLanguageChange}
              >
                <FormControlLabel
                  value="en"
                  control={<Radio />}
                  label={<img src="/flags/us.svg" alt="USA Flag" width="24" />}
                />
                <FormControlLabel
                  value="vi"
                  control={<Radio />}
                  label={<img src="/flags/vn.svg" alt="Vietnam Flag" width="24" />}
                />
              </RadioGroup>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
