import { useSelector } from 'react-redux';
// MUI
import { AppBar, Badge, Container, IconButton, Toolbar } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
// Components
import Logo from '../Logo';
import UserMenu from './UserMenu';
import SignInButton from './SignInButton';
// Store
import { cartActions, selectCartProducts } from '../../../adapters/redux/cart';
import { selectIsAuth } from '../../../adapters/redux/user';
// shared
import { useAppDispatch } from '../../hooks';

const Header = () => {
  const dispatch = useAppDispatch();
  const cartLength = useSelector(selectCartProducts).length;
  const isAuth = useSelector(selectIsAuth);

  const openCart = () => {
    dispatch(cartActions.openCart());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          {isAuth ? <UserMenu /> : <SignInButton />}
          <IconButton color="inherit" onClick={openCart} sx={{ ml: '10px' }}>
            <Badge color="secondary" badgeContent={cartLength}>
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
