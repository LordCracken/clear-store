import { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Product from '../../domain/entities/product';

type IProductItem = Omit<Product, 'id' | 'description' | 'tags'>;

const ProductItem: FC<IProductItem> = ({ name, image, price, author }) => {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ height: '100%' }}>
        <CardMedia image={image} title={name} sx={{ height: 140 }} />
        <CardContent>
          <Typography variant="h6" component="h3">
            {name}
          </Typography>
          <Typography
            variant="h6"
            component="h4"
            sx={{ fontSize: '1rem', fontStyle: 'italic', mb: '10px' }}
          >
            {author}
          </Typography>
          <Typography variant="body1">Цена: {price} руб.</Typography>
        </CardContent>
        <CardActions>
          <Button>Купить</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
