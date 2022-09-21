import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import ScoopOption from './ScoopOption';
import ToopingOption from './ToopingOption';

function Options({ optionType }) {
  // optionType: 'scoops' or 'toppings'

  const [items, setItems] = useState([]);

  const getOptions = async (option) => {
    try {
      const response = await fetch(`http://localhost:3030/${option}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      // TODO: handle errors
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOptions(optionType);
  }, [optionType]);

  // TODO: replace null with ToopingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToopingOption;

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} item={item} />
  ));

  return <Row>{optionItems}</Row>;
}

export default Options;
