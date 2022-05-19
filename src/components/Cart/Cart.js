import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';
import Spinner from '../UI/Spinner';
import ErrorMessage from '../UI/ErrorMessage';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const { error, loading, fetchData } = useHttp();


  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const showCheckoutHandler = () => {
    setIsCheckoutActive(true);
  }

  const closeCheckoutHandler = () => {
    setIsCheckoutActive(false)
  }

  const sendData = (data) => {
    fetchData({ url: 'https://react-training-dummy-data-default-rtdb.firebaseio.com/clients.json', method: 'POST', body: data }, (data) => {
      const id = data.name
      console.log(id);
      /// ADD LOGIC FOR STORE USER IN STATE/STORE
    })
  }

  const modalItems = isCheckoutActive
    ? <Checkout fetchData={sendData} onCancel={closeCheckoutHandler} />
    : <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={showCheckoutHandler}>Order</button>}
    </div>


  return (
    <Modal onClose={props.onClose}>
      {error && <ErrorMessage message={error} />}
      {loading ? <Spinner /> : cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {modalItems}
    </Modal>
  );
};

export default Cart;
