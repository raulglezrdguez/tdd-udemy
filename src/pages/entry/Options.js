import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import AlertBanner from '../common/AlertBanner';

import ScoopOption from './ScoopOption';
import ToopingOption from './ToopingOption';

function Options({ optionType }) {
  // optionType: 'scoops' or 'toppings'

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const getOptions = async (option) => {
    try {
      const response = await fetch(`http://localhost:3030/${option}`, {
        method: 'GET',
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
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToopingOption;

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} item={item} />
  ));

  return <Row>{optionItems}</Row>;
}

export default Options;
