import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import img from "../../assets/mainBcg.jpeg";

export default function Product({ image, title, id, price }) {
  return (
    <article className="product">
      <div className="img-container">
        <img src={image || img} alt={title || "Filler Title"} />
        <Link to={`products/${id}`} className="btn product-link">
          Info
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title || "default title"}</p>
        <p className="product-price">${price || "Your bank account"}</p>
      </div>
    </article>
  );
}
Product.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
