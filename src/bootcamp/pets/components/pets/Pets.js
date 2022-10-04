import Filter from "../filter/Filter";
import Cards from "../cards/Cards";

import "./Pets.css";
import { useState } from "react";
import { useEffect } from "react";
import AlertBanner from "../../../../pages/common/AlertBanner";

const Pets = () => {
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({
    gender: "any",
    favorite: "any",
  });

  useEffect(() => {
    fetch("http://localhost:3030/cats")
      .then((response) => response.json())
      .then((data) => setCats(data))
      .catch((err) => {
        setError(true);
      });
  }, []);

  const updateFavorite = (id, favorite) => {
    const newCats = [...cats];
    const updateCat = newCats.find((cat) => cat.id === id);
    updateCat.favorite = favorite;
    setCats(newCats);
  };

  if (error) {
    return <AlertBanner variant={"span"} message={null} />;
  }

  let catsFiltered = [...cats];
  if (filters.gender !== "any") {
    catsFiltered = catsFiltered.filter((cat) => cat.gender === filters.gender);
  }
  if (filters.favorite !== "any") {
    catsFiltered = catsFiltered.filter(
      (cat) => cat.favorite === (filters.favorite === "favorite")
    );
  }

  return (
    <div className="container">
      <div className="app-container">
        <Filter filters={filters} setFilters={setFilters} />
        <Cards cats={catsFiltered} updateFavorite={updateFavorite} />
      </div>
    </div>
  );
};

export default Pets;
