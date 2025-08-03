import type { SyntheticEvent } from 'react';

import { Alert, Snackbar } from '@mui/material';

interface ErrorSnackbarProps {
  message: string;
  open: boolean;
  onClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

const ErrorSnackbar = ({ message, open, onClose }: ErrorSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
