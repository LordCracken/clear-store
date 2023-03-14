import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// MUI
import { Container } from '@mui/material';
// Store
import { CartInstance, ProductsInstance, UserInstance } from '../adapters/presenter';
// Components
import Header from './components/Header/Header';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import Cart from './components/Cart/Cart';

const App = () => {
  const auth = getAuth();
  const { isAuthenticated } = UserInstance;
  const { products } = ProductsInstance;
  const { getCart } = CartInstance;

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (user) UserInstance.autologin();
    })();
  }, []);

  useEffect(() => {
    getCart(products);
  }, [isAuthenticated, products]);

  return (
    <>
      <Header />
      <Container sx={{ mt: '100px' }}>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Container>
      <Cart />
    </>
  );
};

export default observer(App);
