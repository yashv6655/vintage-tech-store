import React from "react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <section className="empty-cart section">
      <h2>Cart Is Empty</h2>
      <Link to="/products" className="btn">
        Fill the Cart
      </Link>
    </section>
  );
}
