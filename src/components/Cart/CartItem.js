import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatch = useDispatch();

  const addItemHandle = () => {
    const item = {
      title, 
      quantity,
      totalPrice: total,
      price,
      id
    }
    dispatch(cartActions.addItemToCart(item));
  };

  const removeItemHandle = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandle}>-</button>
          <button onClick={(addItemHandle)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
