import { useState, type MouseEvent } from 'react';
import { AccountCircle, Settings, Person } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from '@/components/shared/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher/LanguageSwitcher';

export default function ProfileMenu() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={openProfile ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openProfile ? 'true' : undefined}
        onClick={handleMenu}
        sx={{ color: 'common.white' }}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openProfile}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('profile')} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('settings')} />
        </MenuItem>
        <Divider />
        <ThemeSwitcher />
        <Divider />
        <LanguageSwitcher />
      </Menu>
    </>
  );
}
