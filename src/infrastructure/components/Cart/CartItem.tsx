import { FC } from 'react';
import { observer } from 'mobx-react-lite';
// MUI
import { Box, IconButton, ListItem, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
// Store
import { CartInstance, ProductsInstance } from '../../../adapters/presenter';

interface ICartItem {
  id: string;
  quantity: number;
}

const CartItem: FC<ICartItem> = ({ id, quantity }) => {
  const { addItem, removeItem } = CartInstance;
  const product = ProductsInstance.getProduct(id)!;
  const { name, author, price } = product;

  const addItemHandler = () => {
    addItem(id, price);
  };

  const removeItemHandler = () => {
    removeItem(id, price);
  };

  return (
    <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <Typography variant="body1">
        {name}, {author} {price}руб.
      </Typography>
      <Box>
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

export default observer(CartItem);
