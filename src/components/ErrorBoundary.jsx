import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4 border border-red-400 rounded bg-red-100">
      <p className="font-bold text-red-600">Something went wrong:</p>
      <pre className="text-sm text-red-800 whitespace-pre-wrap">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}


 export function FunctionalErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        
        window.location.reload(); 
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundary;
