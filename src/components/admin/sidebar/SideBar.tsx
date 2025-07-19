import { List, Toolbar, Typography, Drawer as MuiDrawer } from '@mui/material';

import SideBarItem from './SideBarItem';
import { Drawer } from './SideBar.styles';
import sidebarItems from './sidebar.config.tsx';

interface SideBarProps {
  open: boolean;
  isMobile: boolean;
  handleDrawerClose: () => void;
}

export default function SideBar({
  open,
  isMobile,
  handleDrawerClose,
}: SideBarProps) {
  const drawerContent = (
    <>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <img src="/vite.svg" alt="logo" width={32} height={32} />
        {open && (
          <Typography variant="h6" sx={{ ml: 2 }}>
            React App
          </Typography>
        )}
      </Toolbar>
      <List>
        {sidebarItems.map((item, index) => (
          <SideBarItem
            key={index}
            open={open}
            to={item.to}
            icon={item.icon}
            text={item.text}
            children={item.children}
          />
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile ? (
        <MuiDrawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={(theme) => ({
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: theme.drawerWidth,
            },
          })}
        >
          {drawerContent}
        </MuiDrawer>
      ) : (
        <Drawer variant="permanent" open={open}>
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
