import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const getCartData = () => {
    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch('https://redux-demo-c9fd1-default-rtdb.europe-west1.firebasedatabase.app/cart.json');
          
            if (!response.ok) {
                throw new Error('Could not fetch cart data.')
              }

            const data = await response.json();
            return data;
        };

        try {

            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                  items: cartData.items || [],
                  totalQuantity: cartData.totalQuantity,
                })
              );
           
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: error | 'Error fetching cart data.'
              }));
        }
    };
}

export const sendCartData = (cart) => {
    return async (dispatch) => {     
        dispatch(uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch('https://redux-demo-c9fd1-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                })
              });   
              
              if (!response.ok) {
                throw new Error('Sending cart data failed.')
              }
        }

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Cart data sent successfully!'
              }));
        
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending cart data failed!'
              }));
        }
    }
}
