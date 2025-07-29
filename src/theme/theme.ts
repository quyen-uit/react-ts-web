import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#5E936C',
        },
        secondary: {
          main: '#93DA97',
        },
        background: {
          default: '#ffffff',
        },
        sidebarAction: {
          hover: '#DEE9E1',
          selected: '#BED3C4',
          active: '#5E936C',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#5E936C',
        },
        secondary: {
          main: '#CFFFD7',
        },
        background: {
          default: '#1E2A22',
        },
        text: {
          primary: '#E8FFD7',
        },
        sidebarAction: {
          hover: '#548461',
          selected: '#385840',
          active: '#E8FFD7',
        },
      },
    },
  },
  drawerWidth: 240,
});

export default theme;
