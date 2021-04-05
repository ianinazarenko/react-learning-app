import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

// check if there is something in the cart
function getLocalStorage() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) return cart;
  return [];
}

const initialState = {
  cart: getLocalStorage(),
  items_amount: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add to cart
  function addToCart(id, color, amount, product) {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  }

  // remove item
  function removeItem(id) {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  }

  // toggle amount
  function toggleAmount(id, value) {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  }

  // clear cart
  function clearCart() {
    dispatch({ type: CLEAR_CART });
  }

  // write into local storage
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // render
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
