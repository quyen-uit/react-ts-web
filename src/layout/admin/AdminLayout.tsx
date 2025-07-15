import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Toolbar, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./NavBar";

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        open={open}
        isMobile={isMobile}
        handleDrawerToggle={handleDrawerToggle}
      />
      <SideBar
        open={open}
        isMobile={isMobile}
        handleDrawerClose={handleDrawerClose}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
