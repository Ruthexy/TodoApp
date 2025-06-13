import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import ErrorBoundary from './components/ErrorBoundary'; // Uncomment if using

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Optional: Add error boundary here */}
      {/* <ErrorBoundary> */}
        <App />
      {/* </ErrorBoundary> */}
    </QueryClientProvider>
  </StrictMode>
);
