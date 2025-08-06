import '@mui/material/styles';

interface PaletteAction {
  hover: string;
  selected: string;
  active: string;
}

interface PaletteActionOptions {
  hover?: string;
  selected?: string;
  active?: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    drawerWidth: number;
  }
  interface ThemeOptions {
    drawerWidth?: number;
  }

  interface Palette {
    sidebarAction: PaletteAction;
  }

  interface PaletteOptions {
    sidebarAction?: PaletteActionOptions;
  }
}
