import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>404. Page Not Found</h1>
        <Link to="/" className="btn">
          Home
        </Link>
      </div>
    </section>
  );
}
