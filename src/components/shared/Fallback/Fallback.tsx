import React from 'react';
import { type ErrorInfo } from 'react';

export interface FallbackProps {
  error?: Error;
  errorInfo?: ErrorInfo;
}

const Fallback: React.FC<FallbackProps> = ({ error, errorInfo }) => {
  const handleReload = () => {
    // Clear any stored error state if needed
    try {
      // Attempt to reload the page
      window.location.reload();
    } catch (e) {
      // If reload fails, redirect to home page
      console.log(e);
      window.location.href = '/';
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6 md:p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
            Something went wrong
          </h1>
          <p className="mt-2 text-gray-600">
            Were sorry, but an unexpected error has occurred. Our team has been
            notified.
          </p>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 rounded-lg p-4 max-h-60 overflow-auto">
            <h2 className="text-lg font-semibold text-red-800">
              Error Details
            </h2>
            <p className="mt-2 text-red-700 font-mono text-sm">
              {error.toString()}
            </p>
            {errorInfo && (
              <details className="mt-3">
                <summary className="cursor-pointer text-red-700 font-medium text-sm">
                  Stack Trace
                </summary>
                <pre className="mt-2 text-xs text-gray-700 whitespace-pre-wrap bg-gray-100 p-2 rounded">
                  {errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            onClick={handleReload}
          >
            Reload Page
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            onClick={handleGoHome}
          >
            Go to Home
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>If the problem persists, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
