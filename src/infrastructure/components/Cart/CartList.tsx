import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// MUI
import { Button, Divider, ListItem, Typography } from '@mui/material';
// Components
import CartItem from './CartItem';
// Store
import { cartActions } from '../../../adapters/redux/cart';
import { selectIsAuth } from '../../../adapters/redux/user';
// shared
import { useAppDispatch, useAppSelector } from '../../hooks';

const CartList = () => {
  const dispatch = useAppDispatch();
  const { products, totalPrice } = useAppSelector(state => state.cart);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const createOrderHandler = () => {
    if (!isAuth) {
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
