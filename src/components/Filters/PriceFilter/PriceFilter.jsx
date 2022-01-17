import React from "react";
import "./PriceFilter.scss";

const PriceFilter = ({ onChange, filters }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="priceFilter-block">
      <h3 className="priceFilter-block_header">Цена</h3>
      <ul className="priceFilter-block_inputs">
        <li>
          <label>
            От
            <input
              className="price-input price-input_from"
              name="priceFilterFrom"
              value={filters.priceFilterFrom}
              onChange={handleChange}
            />
          </label>
        </li>
        <li>
          <label>
            До
            <input
              className="price-input"
              name="priceFilterTo"
              value={filters.priceFilterTo}
              onChange={handleChange}
            />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default PriceFilter;
