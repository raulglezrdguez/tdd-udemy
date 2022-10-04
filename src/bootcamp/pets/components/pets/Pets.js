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
  });

  useEffect(() => {
    fetch("http://localhost:3030/cats")
      .then((response) => response.json())
      .then((data) => setCats(data))
      .catch((err) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <AlertBanner variant={"span"} message={null} />;
  }

  let catsFiltered = [...cats];
  if (filters.gender !== "any") {
    catsFiltered = cats.filter((cat) => cat.gender === filters.gender);
  }

  return (
    <div className="container">
      <div className="app-container">
        <Filter filters={filters} setFilters={setFilters} />
        <Cards cats={catsFiltered} />
      </div>
    </div>
  );
};

export default Pets;
