import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const SignInButton = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/auth');
  };

  return (
    <Button
      variant="outlined"
      startIcon={<AccountCircle />}
      sx={{ color: '#fff' }}
      onClick={clickHandler}
    >
      <Typography sx={{ display: { xs: 'none', sm: 'inline' } }}>Войти</Typography>
    </Button>
  );
};

export default SignInButton;
