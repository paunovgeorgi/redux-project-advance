import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/UI/Notification';
import { getCartData, sendCartData } from './store/cart-actions';


let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);


  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  useEffect(() => {

    if (isInitial) {
      isInitial = !isInitial;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  return (
    <Fragment>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    <Layout>
     {showCart && <Cart /> }
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
