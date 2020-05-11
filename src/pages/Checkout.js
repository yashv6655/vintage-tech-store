import React, { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
import submitOrder from "../strapi/submitOrder";
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from "react-stripe-elements";

function Checkout(props) {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);

  const history = useHistory();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const isEmpty = !name || alert.show;

  async function handleSubmit(event) {
    showAlert({ msg: "We are processing your request..." });
    event.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch((error) => console.log(error));

    const { token } = response;
    if (token) {
      setError("");
      const { id } = token;
      let order = await submitOrder({
        name: name,
        total: total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });

      if (order) {
        showAlert({ msg: "Your order has been recieved" });
        clearCart();
        history.push("/");
        return;
      } else {
        showAlert({
          msg: "There was an error. Please try again.",
          type: "danger",
        });
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  }

  if (cart.length < 1) return <EmptyCart />;

  return (
    <section className="section form">
      <h2 className="section-title">Checkout</h2>
      <form className="checkout-form">
        <h3>
          Total: <span>${total}</span>
        </h3>
        {/* name*/}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        {/* end of name */}
        {/* card */}
        <div className="stripe-input">
          <label htmlFor="card">Credid or Debit Card</label>
          <p className="stripe-info">
            Test using this credit card: <span>4242 4242 4242 4242</span>
            <br />
            enter zipcode
            <br />
            enter CVC
          </p>
        </div>
        {/* end of card */}
        {/* stripe element */}
        <CardElement className="card-element"></CardElement>
        {/* stripe errors */}
        {error && <p className="form-empty">{error}</p>}
        {isEmpty ? (
          <p className="form-empty">Fill out the name field</p>
        ) : (
          <button
            type="button"
            className="btn btn-block"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}

        {/* end of stripe element */}
      </form>
    </section>
  );
}

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_UV2IqI0pKKOOCS7kqx9N22EB00cT4gU5WJ">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
