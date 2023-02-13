import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Box, IconButton, ListItem, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { RootState, useAppDispatch } from '../store';
import { addProduct } from '../store/cart-actions';

interface ICartItem {
  id: string;
  quantity: number;
}

const CartItem: FC<ICartItem> = ({ id, quantity }) => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find(item => item.id === id)!;
  const { name, author, price } = product;

  const addItemHandler = () => {
    dispatch(addProduct(product));
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
        <IconButton>
          <Remove />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default CartItem;
