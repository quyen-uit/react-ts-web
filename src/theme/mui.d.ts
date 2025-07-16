import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    drawerWidth: number;
  }
  interface ThemeOptions {
    drawerWidth?: number;
  }
}
