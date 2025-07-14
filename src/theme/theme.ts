import { createTheme, extendTheme } from '@mui/material/styles';

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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none' as const,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
