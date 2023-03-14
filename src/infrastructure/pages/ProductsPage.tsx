import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
// MUI
import { CircularProgress, Grid } from '@mui/material';
// Components
import ProductItem from '../components/Products/ProductItem';
// Store
import { ProductsInstance } from '../../adapters/presenter';
import ProductsListError from '../components/Products/ProductsListError';

const ProductsPage = () => {
  const { status, products } = ProductsInstance;

  useEffect(() => {
    if (!products.length) {
      ProductsInstance.fetchProductsData();
    }
  }, []);

  const hasProducts = products.map(item => (
    <ProductItem
      key={item.id}
      id={item.id}
      name={item.name}
      author={item.author}
      image={item.image}
      price={item.price}
    />
  ));
  let hasNoProducts;

  if (status === 'loading') hasNoProducts = <CircularProgress sx={{ margin: 'auto' }} />;
  if (status === 'error') hasNoProducts = <ProductsListError />;

  return (
    <Grid container spacing={products.length ? 2 : 0}>
      {products.length ? hasProducts : hasNoProducts}
    </Grid>
  );
};

export default observer(ProductsPage);
