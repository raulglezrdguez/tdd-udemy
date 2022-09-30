import Options from "./Options";

import { useOrderDetails } from "../../context/OrderDetails";
import { Button } from "react-bootstrap";

function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae</Button>
    </div>
  );
}

export default OrderEntry;
