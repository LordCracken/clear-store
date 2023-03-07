import { useSelector } from 'react-redux';
// MUI
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
// Components
import CartList from './CartList';
// Store
import { useAppDispatch } from '../../../adapters/redux';
import { cartActions, selectCartIsOpen, selectCartProducts } from '../../../adapters/redux/cart';

const Cart = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(selectCartProducts);
  const isOpen = useSelector(selectCartIsOpen);

  const closeCart = () => {
    dispatch(cartActions.closeCart());
  };

  const hasOrder = <CartList />;
  const hasNoOrder = <ListItem>Корзина пуста!</ListItem>;

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart}>
      <List sx={{ width: { md: '400px', xs: '300px' } }}>
        <ListItem>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary={'Корзина'} />
        </ListItem>
        <Divider />
        {!products.length ? hasNoOrder : hasOrder}
      </List>
    </Drawer>
  );
};

export default Cart;
