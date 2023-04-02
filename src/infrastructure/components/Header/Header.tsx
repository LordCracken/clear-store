import { observer } from 'mobx-react-lite'; // MUI
import { AppBar, Badge, Container, IconButton, Toolbar } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
// Components
import Logo from '../Logo';
import UserMenu from './UserMenu';
import SignInButton from './SignInButton';
// Store
import { CartInstance, UserInstance } from '../../../adapters/presenter';

const Header = () => {
  const isAuthenticated = UserInstance.isAuthenticated;
  const { cartProducts, setIsOpen } = CartInstance;

  const openCart = () => {
    setIsOpen(true);
  };

  return (
    <AppBar position="static" data-testid="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          {isAuthenticated ? <UserMenu /> : <SignInButton />}
          <IconButton
            color="inherit"
            onClick={openCart}
            sx={{ ml: '10px' }}
            data-testid="cart-button"
          >
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
