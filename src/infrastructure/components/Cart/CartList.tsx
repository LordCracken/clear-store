import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
// MUI
import { Button, Divider, ListItem, Typography } from '@mui/material';
// Components
import CartItem from './CartItem';
// Store
import { CartInstance } from '../../../adapters/presenter';

const CartList = () => {
  const { getIsAuth, cartProducts, totalPrice, setIsOpen, reset } = CartInstance;
  const navigate = useNavigate();

  const createOrderHandler = () => {
    if (!getIsAuth()) {
      navigate('/auth');
      setIsOpen(false);
      return;
    }

    reset();
  };

  return (
    <>
      {cartProducts.map(item => (
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

export default observer(CartList);
