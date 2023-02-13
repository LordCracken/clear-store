import { useNavigate } from 'react-router-dom';

import { IconButton } from '@mui/material';
import { Login } from '@mui/icons-material';

const SignInButton = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/auth');
  };

  return (
    <IconButton color="inherit" onClick={clickHandler}>
      <Login />
    </IconButton>
  );
};

export default SignInButton;
