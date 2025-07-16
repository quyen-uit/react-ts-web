import React from 'react';

const Fallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-700 mt-4">
        We are sorry, but an unexpected error has occurred.
      </p>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
};

export default Fallback;
