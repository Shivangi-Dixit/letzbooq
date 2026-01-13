import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.css";
import { ErrorProvider } from './contexts/ErrorContext';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorProvider>
        </ThemeProvider>
   </React.StrictMode>
);
