import { useState } from 'react';

import heartFilled from '../../svgs/heartFilled.svg';
import heartOutlined from '../../svgs/heartOutlined.svg';

import './Card.css';

const Card = ({ name, phone, email, image, favorite }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  return (
    <article className="card">
      <div className="card-header">
        <img src={image.url} alt={image.alt} className="card-img" />
        <button className="heart" onClick={() => setIsFavorite((fav) => !fav)}>
          {isFavorite ? (
            <img src={heartFilled} alt="filled heart" />
          ) : (
            <img src={heartOutlined} alt="outline heart" />
          )}
        </button>
      </div>
      <div className="card-content">
        <p>{phone}</p>
        <p>{email}</p>
        <h1>{name}</h1>
      </div>
    </article>
  );
};

export default Card;
