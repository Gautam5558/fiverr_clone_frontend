import React from "react";
import "./success.scss";
import { useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const payment_intent = searchParams.get("payment_intent");

  const navigate = useNavigate();

  useEffect(() => {
    async function updateOrder() {
      try {
        await axios.put(
          import.meta.env.VITE_BASE_URL + "/api/orders/" + payment_intent
        );
        setTimeout(() => {
          navigate("/orders");
        }, 4000);
      } catch (err) {
        console.log(err);
      }
    }
    updateOrder();
  }, []);

  return (
    <h1>
      Payment Successful. Redirecting you to the orders page.Just wait for a few
      seconds
    </h1>
  );
};

export default Success;
