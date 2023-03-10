import { FC } from 'react';
import { useSelector } from 'react-redux';
// MUI
import { Box, IconButton, ListItem, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
// Store
import { selectProductItem } from '../../../adapters/redux/products';
// shared
import { useAppDispatch } from '../../hooks';
import { addItem, removeItem } from '../../../adapters/redux/cart/actions';

interface ICartItem {
  id: string;
  quantity: number;
}

const CartItem: FC<ICartItem> = ({ id, quantity }) => {
  const dispatch = useAppDispatch();
  const product = useSelector(selectProductItem(id))!;
  const { name, author, price } = product;

  const addItemHandler = () => {
    dispatch(addItem(id, price));
  };

  const removeItemHandler = () => {
    dispatch(removeItem(id, price));
  };

  return (
    <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="body1">
        {name}, {author} {price}руб.
      </Typography>
      <Box sx={{}}>
        <IconButton onClick={addItemHandler}>
          <Add />
        </IconButton>
        <Typography component="span" sx={{ px: '5px' }}>
          {quantity}
        </Typography>
        <IconButton onClick={removeItemHandler}>
          <Remove />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default CartItem;
