import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertTitle, Box, Button, Grid, Snackbar, TextField } from '@mui/material';
import { RootState, useAppDispatch } from '../store';
import { signInUser } from '../store/user-actions';

const AuthPage = () => {
  const [email, setEmail] = useState<Email>('');
  const [password, setPassword] = useState<Password>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [snackIsOpen, setSnackIsOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.email) {
      navigate('/');
    }
  }, [user.email]);

  const signInHandler = () => {
    const emailValidation = email.length === 0;
    const passwordValidation = password.length < 7;

    if (emailValidation) {
      setEmailError('Введите Email');
    }

    if (passwordValidation) {
      setPasswordError('Пароль меньше 7 символов');
    }

    if (emailValidation || passwordValidation) {
      return;
    }

    dispatch(signInUser(email, password));

    if (error) {
      setSnackIsOpen(true);
    }

    setEmailError('');
    setPasswordError('');
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const closeSnackHandler = () => {
    setSnackIsOpen(false);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ maxWidth: 250, '.MuiGrid-item': { width: '100%' } }}
        >
          <Grid item>
            <TextField
              error={!!emailError}
              type="email"
              label="Email"
              sx={{ width: '100%' }}
              value={email}
              helperText={emailError}
              onChange={emailChangeHandler}
              onBlur={() => email && setEmailError('')}
            />
          </Grid>
          <Grid item>
            <TextField
              error={!!passwordError}
              type="password"
              label="Пароль"
              sx={{ width: '100%' }}
              value={password}
              helperText={passwordError}
              onChange={passwordChangeHandler}
              onBlur={() => password && setPasswordError('')}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" size="large" sx={{ width: '100%' }} onClick={signInHandler}>
              Войти
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackIsOpen}
        autoHideDuration={5000}
        onClose={closeSnackHandler}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={closeSnackHandler}>
          <AlertTitle>Ошибка!</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthPage;
