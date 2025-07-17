import '@mui/material/styles';

import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    drawerWidth: number;
  }
  interface ThemeOptions {
    drawerWidth?: number;
  }

  interface Palette {
    active: PaletteColor;
  }

  interface PaletteOptions {
    active?: PaletteColorOptions;
  }
}
