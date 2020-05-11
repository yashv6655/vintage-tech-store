import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";
//import {UserContext} from "../context/user";

export default function Cart() {
  const { cart, total } = useContext(CartContext);
  const { user } = useContext(UserContext);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="cart-items section">
      <h2>Cart</h2>
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <h2>Total: ${total}</h2>
      {user.token ? (
        <Link to="/checkout" className="btn btn-block">
          Proceed to checkout
        </Link>
      ) : (
        <Link to="/login" className="btn btn-block">
          Login
        </Link>
      )}
    </section>
  );
}
