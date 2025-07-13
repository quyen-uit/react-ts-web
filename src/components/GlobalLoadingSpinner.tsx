import { CircularProgress } from '@mui/material';

const GlobalLoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <CircularProgress />
    </div>
  );
};

export default GlobalLoadingSpinner;
