import Card from "../card/Card";

import "./Cards.css";

const Cards = ({ cats, updateFavorite }) => {
  return (
    <div className="pet-cards-container">
      {cats.map((cat) => (
        <Card key={cat.id} {...cat} updateFavorite={updateFavorite} />
      ))}
    </div>
  );
};

export default Cards;
