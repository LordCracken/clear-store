import { Button, Divider, ListItem, Typography } from '@mui/material';
import CartItem from './CartItem';
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const CartList = () => {
  const dispatch = useAppDispatch();
  const { products, totalPrice } = useSelector((state: RootState) => state.cart);

  const createOrderHandler = () => {
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
