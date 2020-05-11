import React, { useContext } from "react";
import ProductList from "./ProductList";
import Loading from "../Loading";
import { ProductContext } from "../../context/products";

export default function FeaturedProducts() {
  const { loading, featured } = useContext(ProductContext);
  if (loading) {
    return <Loading />;
  }

  return <ProductList title="Special Products" products={featured} />;
}
