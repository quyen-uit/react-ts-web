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
        text: {
          primary: '#000000',
          secondary: '#5E936C'
        },
        active: {
          light: '#DEE9E1',
          main: '#BED3C4',
          dark: '#5E936C',
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
        active: {
          light: '#548461',
          main: '#385840',
          dark: '#E8FFD7',
        },
      },
    },
  },
  drawerWidth: 240,
});

export default theme;
