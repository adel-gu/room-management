import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App.tsx';

// Styles
import GlobalStyles from './styles/index.ts';
import { Toaster } from 'react-hot-toast';
import ThemeContextProvider from './context/ThemeContext.tsx';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeContextProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
