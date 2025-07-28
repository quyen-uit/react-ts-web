import * as React from 'react';

import { Toolbar, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import { NavBar } from '@/layout/admin';
import { SideBar } from '@/layout/admin';

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(!isMobile);
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar
        open={open}
        isMobile={isMobile}
        handleDrawerToggle={handleDrawerToggle}
      />
      <SideBar
        open={open}
        isMobile={isMobile}
        handleDrawerClose={handleDrawerClose}
      />
      <Box sx={{ flexGrow: 1, p: 2, overflow: 'hidden' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
