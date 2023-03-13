import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
// MUI
import { Grid } from '@mui/material';
// Components
import ProductItem from '../components/ProductItem';
// Store
import { ProductsInstance } from '../../adapters/presenter';

const ProductsPage = () => {
  const products = ProductsInstance.products;

  useEffect(() => {
    if (!products.length) {
      (async () => {
        await ProductsInstance.fetchProductsData();
      })();
    }
  }, []);

  return (
    <Grid container spacing={2}>
      {products.map(item => (
        <ProductItem
          key={item.id}
          id={item.id}
          name={item.name}
          author={item.author}
          image={item.image}
          price={item.price}
        />
      ))}
    </Grid>
  );
};

export default observer(ProductsPage);
