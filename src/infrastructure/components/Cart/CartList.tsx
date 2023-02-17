import { Button, Divider, ListItem, Typography } from '@mui/material';
import CartItem from './CartItem';
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';
import { useNavigate } from 'react-router-dom';

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
