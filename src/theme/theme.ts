import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#4CAF50',
        },
        secondary: {
          main: '#8BC34A',
        },
        background: {
          default: '#FCFDF7',
        },
        text: {
          primary: '#333333',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#A5D6A7',
        },
        secondary: {
          main: '#CDDC39',
        },
        background: {
          default: '#1B201B',
        },
        text: {
          primary: '#E8F5E9',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  drawerWidth: 240,
});

export default theme;
