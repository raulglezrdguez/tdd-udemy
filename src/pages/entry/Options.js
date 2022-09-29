import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { pricePerItem } from "../../constants";
import AlertBanner from "../common/AlertBanner";

import ScoopOption from "./ScoopOption";
import ToopingOption from "./ToopingOption";

import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

function Options({ optionType }) {
  // optionType: 'scoops' or 'toppings'
  const [orderDetails, updateItemCount] = useOrderDetails();

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const getOptions = async (option) => {
    try {
      const response = await fetch(`http://localhost:3030/${option}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  useEffect(() => {
    getOptions(optionType);
  }, [optionType]);

  if (error) {
    return <AlertBanner variant={"span"} />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToopingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      item={item}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}

export default Options;
