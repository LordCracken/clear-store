import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// MUI
import { Grid } from '@mui/material';
// Components
import ProductItem from '../components/ProductItem';
// Store
import { fetchProductsData, selectProducts } from '../../adapters/redux/products';
// shared
import { useAppDispatch } from '../hooks';

const ProductsPage = () => {
  const products = useSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProductsData());
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

export default ProductsPage;
