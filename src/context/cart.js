// cart context
import React, { createContext, useState, useEffect, useReducer } from "react";
import localCart from "../utils/localCart";
import reducer from "./reducer";
import { REMOVE, INCREASE, DECREASE, ADDTOCART, CLEARCART } from "./actions";

function getCartFromLocalStorage() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, getCartFromLocalStorage());
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: id });
    // setCart([...cart].filter((item) => item.id !== id));
  };

  const increaseAmount = (id) => {
    dispatch({ type: INCREASE, payload: id });
    // const newCart = [...cart].map((item) => {
    //   return item.id === id
    //     ? { ...item, amount: item.amount + 1 }
    //     : { ...item };
    // });
    // setCart(newCart);
  };

  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      dispatch({ type: REMOVE, payload: id });
      return;
    } else {
      dispatch({ type: DECREASE, payload: id });
      // const newCart = [...cart].map((item) => {
      //   return item.id === id
      //     ? { ...item, amount: item.amount - 1 }
      //     : { ...item };
      // });
      // setCart(newCart);
    }
  };

  const addToCart = (product) => {
    let item = [...cart].find((item) => item.id === product.id);
    if (item) {
      dispatch({ type: INCREASE, payload: product.id });
    } else {
      dispatch({ type: ADDTOCART, payload: product });
    }
    // const { id, image, title, price } = product;
    // const item = [...cart].find((item) => item.id === id);
    // if (item) {
    //   increaseAmount(id);
    //   return;
    // } else {
    //   const newItem = { id, image, title, price, amount: 1 };
    //   const newCart = [...cart, newItem];
    //   setCart(newCart);
    // }
  };

  const clearCart = () => {
    //setCart([]);
    dispatch({ type: CLEARCART });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartContext, CartProvider };
