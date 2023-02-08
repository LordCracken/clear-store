import { useSelector } from 'react-redux';
import { AppBar, Container, Toolbar } from '@mui/material';

import Logo from './Logo';
import UserMenu from './UserMenu';
import SignInButton from './SignInButton';

import { RootState } from '../store';

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuth = !!user.email;

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          {isAuth ? <UserMenu /> : <SignInButton />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
