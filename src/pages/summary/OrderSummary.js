import { useOrderDetails } from "../../context/OrderDetails";
import SummaryForm from "./SummaryForm";

function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Array.from(orderDetails.toppings.keys());
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {orderDetails.toppings.size > 0 && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul>{toppingList}</ul>
        </>
      )}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

export default OrderSummary;
