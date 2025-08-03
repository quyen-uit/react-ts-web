import type { SyntheticEvent } from 'react';

import { Alert, Snackbar } from '@mui/material';

interface InfoSnackbarProps {
  message: string;
  open: boolean;
  onClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

const InfoSnackbar = ({ message, open, onClose }: InfoSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="info" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default InfoSnackbar;
