import { AppBar, Container, Toolbar } from '@mui/material';

import Logo from './Logo';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
