import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
// Store
import { signInAction, signUpAction, userActions } from '../../adapters/redux/user';
// Shared
import { useAppDispatch, useAppSelector, useInput } from '../hooks';
import { Status } from '../components/Status';

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, status, statusMsg } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const emailRule = (value: Email) => value.length !== 0;
  const passwordRule = (value: Password) => value.length >= 7;

  const {
    value: email,
    error: emailError,
    setIsTouchedHandler: setEmailIsTouched,
    valueChangeHandler: emailChangeHandler,
  } = useInput(emailRule, 'Введите Email');

  const {
    value: password,
    error: passwordError,
    setIsTouchedHandler: setPasswordIsTouched,
    valueChangeHandler: passwordChangeHandler,
  } = useInput(passwordRule, 'Пароль меньше 7 символов');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    dispatch(userActions.updateStatus({ status: '', statusMsg: '' }));
  }, [isAuthenticated]);

  const signInHandler = (signUp = false) => {
    setEmailIsTouched();
    setPasswordIsTouched();

    if (emailError || passwordError) {
      return;
    }

    if (!emailError && !passwordError) {
      const action = signUp ? signUpAction(email, password) : signInAction(email, password);
      dispatch(action);
    }
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
          sx={{ maxWidth: 300, '.MuiGrid-item': { width: '100%' } }}
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
              onBlur={setEmailIsTouched}
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
              onBlur={setPasswordIsTouched}
            />
          </Grid>
          <Grid item>
            <Stack spacing={{ sm: 2, xs: 1 }} direction={{ xs: 'column', sm: 'row' }}>
              <Button variant="outlined" fullWidth onClick={() => signInHandler(true)}>
                Регистрация
              </Button>
              <Button variant="contained" fullWidth onClick={() => signInHandler()}>
                Войти
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {!!status && !!statusMsg && (
        <Status
          status={status}
          message={statusMsg}
          position={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
    </>
  );
};

export default AuthPage;
