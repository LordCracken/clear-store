import { Box, Button, Grid, TextField } from '@mui/material';
import { RootState, useAppDispatch } from '../store';
import { signInUser } from '../store/user-actions';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';

const AuthPage = () => {
  const [email, setEmail] = useState<Email>('');
  const [password, setPassword] = useState<Password>('');

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const signInHandler = () => {
    dispatch(signInUser(email, password));

    if (user.email) {
      console.log('success');
    } else {
      console.log('fail');
    }
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
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
            type="email"
            label="Email"
            sx={{ width: '100%' }}
            value={email}
            onChange={emailChangeHandler}
          />
        </Grid>
        <Grid item>
          <TextField
            type="password"
            label="Пароль"
            sx={{ width: '100%' }}
            value={password}
            onChange={passwordChangeHandler}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" size="large" sx={{ width: '100%' }} onClick={signInHandler}>
            Войти
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
