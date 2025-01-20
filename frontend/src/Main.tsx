import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './DefaultTheme';
import './tailwind.css';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import stylisRTLPlugin from 'stylis-plugin-rtl';


const cacheRtl = createCache({
  key: 'mui-rtl',
  stylisPlugins: [stylisRTLPlugin],
});

const root = ReactDOM.createRoot(document.getElementById('app')!);

root.render(
  <React.StrictMode>
    <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
