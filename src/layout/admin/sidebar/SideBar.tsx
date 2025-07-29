import { List, Toolbar, Typography } from '@mui/material';

import { Drawer, MobileDrawer } from '../SideBar/SideBar.styles.ts';
import sidebarItems from '../SideBar/sidebar.config.tsx';
import SideBarItem from '../SideBarItem/SideBarItem.tsx';

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
            isMobile={isMobile}
            handleDrawerClose={handleDrawerClose}
          />
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile ? (
        <MobileDrawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerContent}
        </MobileDrawer>
      ) : (
        <Drawer variant="permanent" open={open}>
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
