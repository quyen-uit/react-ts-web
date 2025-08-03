import type { SyntheticEvent } from 'react';

import { Alert, Snackbar } from '@mui/material';

interface WarningSnackbarProps {
  message: string;
  open: boolean;
  onClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

const WarningSnackbar = ({ message, open, onClose }: WarningSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="warning" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default WarningSnackbar;
