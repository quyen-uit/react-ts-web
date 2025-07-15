import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Notifications,
  AccountCircle,
  Settings,
  Person,
  WbSunny,
  NightsStay,
} from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";
import {
  Box,
  ListItemIcon,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, type MouseEvent, type ChangeEvent } from "react";

const drawerWidth = 240;

interface NavBarProps extends MuiAppBarProps {
  open?: boolean;
}

const NavBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<NavBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
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

export default function Header({
  open,
  isMobile,
  handleDrawerToggle,
}: HeaderProps) {
  const { mode, setMode } = useColorScheme();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value === "dark" ? "dark" : "light");
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <NavBar position="fixed" open={!isMobile && open}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{
            color: "common.white",
            marginRight: 5,
            ...(!isMobile && open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {i18n.t("admin")}
        </Typography>
        <Box>
          <IconButton sx={{ color: "common.white" }}>
            <Notifications />
          </IconButton>
          <IconButton
            aria-controls={openProfile ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openProfile ? "true" : undefined}
            onClick={handleMenu}
            sx={{ color: "common.white" }}
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
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Person color="primary" />
              </ListItemIcon>
              <ListItemText primary={i18n.t("profile")} />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings color="primary" />
              </ListItemIcon>
              <ListItemText primary={i18n.t("settings")} />
            </MenuItem>
            <Divider />
            <Box sx={{ pl: 2, pr: 2 }}>
              <Typography variant="caption">
                {i18n.t("toggle_theme")}
              </Typography>
              <RadioGroup
                row
                aria-label="theme"
                name="theme"
                value={mode}
                onChange={handleThemeChange}
              >
                <FormControlLabel
                  value="light"
                  control={<Radio />}
                  label={<WbSunny />}
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio />}
                  label={<NightsStay />}
                />
              </RadioGroup>
            </Box>
            <Divider />
            <Box sx={{ pl: 2, pr: 2 }}>
              <Typography variant="caption">{i18n.t("language")}</Typography>
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
                  label={
                    <img src="/flags/vn.svg" alt="Vietnam Flag" width="24" />
                  }
                />
              </RadioGroup>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </NavBar>
  );
}
