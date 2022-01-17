import React from "react";
import "./TransferFilter.scss";

const TransferFilter = ({ onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
    if (!target.checked) {
      onChange({ name: target.name, value: "" });
    }
  };
  return (
    <div className="transferFilter-block">
      <h3 className="transferFilter-block_header">Фильтровать</h3>
      <ul className="transferFilter-block_inputs">
        <li>
          <label>
            <input
              type="checkbox"
              name="transferFilter"
              value="1 transfer"
              onChange={handleChange}
            />
            {` - 1 пересадка`}
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="noTransferFilter"
              value="no transfers"
              onChange={handleChange}
            />
            {` - без пересадок`}
          </label>
        </li>
      </ul>
    </div>
  );
};

export default TransferFilter;
