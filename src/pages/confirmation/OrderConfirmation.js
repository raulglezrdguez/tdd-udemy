import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import AlertBanner from "../common/AlertBanner";

function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3030/order", {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setOrderNumber(data.orderNumber))
      .catch((err) => {
        setError(true);
      });
  }, []);

  const handleClick = () => {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase("inProgress");
  };

  if (error) {
    // return <AlertBanner variant={null} message={null} />;
    return <AlertBanner variant={"span"} message={null} />;
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default OrderConfirmation;
