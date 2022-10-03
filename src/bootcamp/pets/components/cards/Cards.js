import Card from "../card/Card";

import "./Cards.css";

const Cards = ({ cats }) => {
  return (
    <div className="pet-cards-container">
      {cats.map((cat) => (
        <Card key={cat.id} {...cat} />
      ))}
    </div>
  );
};

export default Cards;
