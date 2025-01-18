import { createTheme as muiCreateTheme, ThemeProvider } from '@mui/material/styles';

 const theme = muiCreateTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#FF8C42',
      light: '#FFB070',
      dark: '#C65E00',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9c27b0',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    allVariants: {
      fontFamily: '"Noto Sans Hebrew", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h1: {
      fontFamily: '"Noto Sans Hebrew", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    body1: {
      fontFamily: '"Noto Sans Hebrew", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    button: {
      fontFamily: '"Noto Sans Hebrew", "Roboto", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        endIcon: {
          '& .MuiSvgIcon-root': {
            transform: 'scaleX(-1) !important', // Ensure SendIcon remains correct
          },
        },
        contained: {
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#ffffff',
            border: '1px solid #FF8C42',
            color: '#FF8C42',
          },
        },
      },
    },
  },
});



export default theme;
