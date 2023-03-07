import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// MUI
import { Button, Divider, ListItem, Typography } from '@mui/material';
// Components
import CartItem from './CartItem';
// Store
import { RootState, useAppDispatch } from '../../../adapters/redux';
import { cartActions } from '../../../adapters/redux/cart';

const CartList = () => {
  const dispatch = useAppDispatch();
  const { products, totalPrice } = useSelector((state: RootState) => state.cart);
  const { email } = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const createOrderHandler = () => {
    if (!email) {
      navigate('/auth');
      dispatch(cartActions.closeCart());
      return;
    }

    dispatch(cartActions.empty());
  };

  return (
    <>
      {products.map(item => (
        <CartItem key={item.id} {...item} />
      ))}
      <Divider />
      <ListItem>
        <Typography sx={{ fontWeight: 700 }}>Общая стоимость: {totalPrice} рублей.</Typography>
      </ListItem>
      <ListItem sx={{ justifyContent: 'center' }}>
        <Button variant="outlined" onClick={createOrderHandler}>
          Оформить заказ
        </Button>
      </ListItem>
    </>
  );
};

export default CartList;
