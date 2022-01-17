import React from "react";
import "./Sort.scss";

const Sort = ({ onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="sort-block">
      <h3 className="sort-block_header">Сортировать</h3>
      <ul className="sort-block_inputs">
        <li>
          <label>
            <input
              type="radio"
              name="sort"
              value="increase"
              onChange={handleChange}
            />
            {` - по возрастанию цены`}
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="sort"
              value="decrease"
              onChange={handleChange}
            />
            {` - по убыванию цены`}
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="sort"
              value="time"
              onChange={handleChange}
            />
            {` - по времени в пути`}
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Sort;
