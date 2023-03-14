import { Alert } from '@mui/material';
import { ProductsInstance } from '../../../adapters/presenter';

const ProductsListError = () => {
  const { statusMsg } = ProductsInstance;

  return (
    <Alert severity="error" variant="outlined" sx={{ justifyContent: 'center', width: '100%' }}>
      {statusMsg}
    </Alert>
  );
};

export default ProductsListError;
