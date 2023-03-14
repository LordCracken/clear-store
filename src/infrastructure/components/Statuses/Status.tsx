import { FC, useEffect, useState } from 'react';
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';

type ISeverity = 'info' | 'error' | 'warning' | 'success';

interface IStatusProps {
  status: Statuses;
  message: string;
  position?: SnackbarOrigin;
}

export const Status: FC<IStatusProps> = ({
  status,
  message,
  position = { vertical: 'bottom', horizontal: 'left' },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState<ISeverity>('info');

  useEffect(() => {
    if (status === 'loading') {
      setSeverity('info');
      setIsOpen(true);
    }

    if (status === 'error') {
      setSeverity('error');
      setIsOpen(true);
    }

    if (status === 'success') {
      setSeverity('success');
      setIsOpen(true);
    }
  }, [status]);

  const closeSnackHandler = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={closeSnackHandler}
      anchorOrigin={position}
    >
      <Alert severity={severity} onClose={closeSnackHandler}>
        {message}
      </Alert>
    </Snackbar>
  );
};
