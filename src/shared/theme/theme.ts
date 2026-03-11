import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0D3B86' },
    secondary: { main: '#1D9BF0' },
    background: { default: '#F5F7FA', paper: '#FFFFFF' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    h1: { fontSize: '2.2rem', fontWeight: 700 },
    h2: { fontSize: '1.7rem', fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
  },
});
