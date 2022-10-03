import Filter from '../filter/Filter';
import Cards from '../cards/Cards';

import './Pets.css';
import { useState } from 'react';
import { useEffect } from 'react';
import AlertBanner from '../../../../pages/common/AlertBanner';

const Pets = () => {
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3030/cats')
      .then((response) => response.json())
      .then((data) => setCats(data))
      .catch((err) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <AlertBanner variant={'span'} message={null} />;
  }

  return (
    <div className="container">
      <div className="app-container">
        <Filter />
        <Cards cats={cats} />
      </div>
    </div>
  );
};

export default Pets;
