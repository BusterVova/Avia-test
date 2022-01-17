import React from "react";
import "./CompaniesFilter.scss";

const CompaniesFilter = ({ onChange, airCompanyFilters }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name });
  };

  return (
    <div className="companiesFilter-block">
      <h3 className="companiesFilter-block_header">Авиакомпании</h3>
      <ul className="companiesFilter-block_inputs">
        {Object.keys(airCompanyFilters).length
          ? Object.keys(airCompanyFilters).map((name) => {
              const { price } = airCompanyFilters[name];
              return (
                <li key={name}>
                  <div className="input-block">
                    <input
                      type="checkbox"
                      name={name}
                      value={name}
                      onChange={handleChange}
                    />
                    <div className="input-block_divider">-</div>
                    <div className="input-block_filter_company-name">{`${name} `}</div>
                    <div>
                      {`от
                ${price} р.`}
                    </div>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default CompaniesFilter;
