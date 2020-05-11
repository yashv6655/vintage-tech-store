import React, { Children } from "react";

export default function Hero({ children }) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>Welcome</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, dolor.
        </p>
        {children}
      </div>
    </div>
  );
}
