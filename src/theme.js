import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00bcd4', // Cyan color
    },
    secondary: {
      main: '#00acc1', // Darker cyan color
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Dark paper background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0bec5', // Light grey text
    },
  },
  typography: {
    h2: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#ffffff',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: '300',
      color: '#b0bec5',
    },
    body1: {
      fontSize: '1rem',
      color: '#b0bec5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
