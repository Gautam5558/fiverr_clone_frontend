import React, { useState, useEffect } from "react";
import "./pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import axios from "axios";
import CheckoutForm from "../../components/checkoutform/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NqGfQSDUh24t4dGMyj2yoNQhJmo063iprWWjiwOLRxvfZ74xzkgg3lNiYfz5djmdW0yDFbAMa7ZUOEHQRQAryyc003PbDvpPn"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { gigId } = useParams();

  useEffect(() => {
    async function fetching() {
      try {
        const res = await axios.post(
          import.meta.env.VITE_BASE_URL +
            "/api/orders/create-payment-intent/" +
            gigId,
          { gigId },
          { withCredentials: true }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    }
    fetching();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
