import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// MUI
import { Container } from '@mui/material';
// Components
import Header from './components/Header/Header';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import Cart from './components/Cart/Cart';
import { useAppDispatch } from './hooks';
import { autologin, selectIsAuth } from '../adapters/redux/user';
import { CartInstance, ProductsInstance } from '../adapters/presenter';

const App = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const products = ProductsInstance.products;
  const { getCart } = CartInstance;

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (user) dispatch(autologin());
    })();
  }, []);

  useEffect(() => {
    getCart(products);
  }, [isAuth, products]);

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
