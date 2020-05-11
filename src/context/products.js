import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProducts } from "../utils/helpers";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => {
      const featured = featuredProducts(flattenProducts(response.data));
      const products = flattenProducts(response.data);
      setFeaturedProducts(featured);
      setProducts(products);
      setLoading(false);
    });
    return () => {};
  }, []);

  return (
    <div>
      <ProductContext.Provider value={{ products, loading, featured }}>
        {children}
      </ProductContext.Provider>
    </div>
  );
}
