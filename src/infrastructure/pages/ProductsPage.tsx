import { Grid } from '@mui/material';
import ProductItem from '../components/ProductItem';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { useEffect } from 'react';
import { fetchProductsData } from '../store/products-actions';

const ProductsPage = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
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
