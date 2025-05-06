import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#1976d2' },
            background: { default: '#f5f5f5', paper: '#fff', buttonColor: '#3888D8', headerBackgroundColor: '#1976D2' },
          }
        : {
            primary: { main: '#90caf9' },
            background: { default: '#121212', paper: '#1e1e1e', buttonColor: '#444444', headerBackgroundColor: '#272727'},
          }),
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });
