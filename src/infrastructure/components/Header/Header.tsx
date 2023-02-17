import { useSelector } from 'react-redux';
// MUI
import { AppBar, Badge, Container, IconButton, Toolbar } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
// Components
import Logo from '../Logo';
import UserMenu from './UserMenu';
import SignInButton from './SignInButton';
// Store
import { useAppDispatch } from '../../store';
import { cartActions, selectCartProducts } from '../../store/cart';
import { selectUser } from '../../store/user';

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const cartLength = useSelector(selectCartProducts).length;
  const isAuth = !!user.email;

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
