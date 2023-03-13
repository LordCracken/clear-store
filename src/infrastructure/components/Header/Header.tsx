import { observer } from 'mobx-react-lite'; // MUI
import { AppBar, Badge, Container, IconButton, Toolbar } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
// Components
import Logo from '../Logo';
import UserMenu from './UserMenu';
import SignInButton from './SignInButton';
// Store
import { CartInstance } from '../../../adapters/presenter';

const Header = () => {
  const { isAuthenticated, cartProducts, setIsOpen } = CartInstance;

  const openCart = () => {
    setIsOpen(true);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          {isAuthenticated ? <UserMenu /> : <SignInButton />}
          <IconButton color="inherit" onClick={openCart} sx={{ ml: '10px' }}>
            <Badge color="secondary" badgeContent={cartProducts.length}>
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default observer(Header);
