import { useSelector } from 'react-redux';
import { AppBar, Badge, Container, IconButton, Toolbar } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import Logo from '../Logo';
import UserMenu from './UserMenu';
import SignInButton from './SignInButton';

import { RootState, useAppDispatch } from '../../store';
import { cartActions } from '../../store/cartSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cartLength = useSelector((state: RootState) => state.cart.products).length;
  const isAuth = !!user.email;

  const openCart = () => {
    dispatch(cartActions.openCart());
  };

  return (
    <AppBar>
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
