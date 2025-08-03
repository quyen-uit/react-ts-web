import type { SyntheticEvent } from 'react';

import { Alert, Snackbar } from '@mui/material';

interface SuccessSnackbarProps {
  message: string;
  open: boolean;
  onClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

const SuccessSnackbar = ({ message, open, onClose }: SuccessSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
