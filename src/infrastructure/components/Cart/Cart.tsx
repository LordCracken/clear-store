import { observer } from 'mobx-react-lite';
// MUI
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
// Components
import CartList from './CartList';
// Store
import { CartInstance } from '../../../adapters/presenter';

const Cart = () => {
  const { cartProducts, isOpen, setIsOpen } = CartInstance;

  const closeCart = () => {
    setIsOpen(false);
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
        {!cartProducts.length ? hasNoOrder : hasOrder}
      </List>
    </Drawer>
  );
};

export default observer(Cart);
