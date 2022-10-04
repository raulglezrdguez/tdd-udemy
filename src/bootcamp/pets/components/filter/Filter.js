const Filter = ({ filters, setFilters }) => {
  return (
    <div className="pet-filter-container">
      <div className="filter-container">
        <label htmlFor="favorite">Favorite</label>
        <select
          name="favorite"
          id="favorite"
          className="form-select"
          value={filters.favorite}
          onChange={(event) =>
            setFilters({ ...filters, favorite: event.target.value })
          }
        >
          <option value="any">Any</option>
          <option value="favorite">Favorite</option>
          <option value="not favorite">Not favorite</option>
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          className="form-select"
          value={filters.gender}
          onChange={(event) =>
            setFilters({ ...filters, gender: event.target.value })
          }
        >
          <option value="any">Any</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
