import React from "react";
import "./Filters.scss";
import Sort from "./Sort/Sort";
import TransferFilter from "./TransferFilter/TransferFilter";
import PriceFilter from "./PriceFilter/PriceFilter";
import CompaniesFilter from "./CompaniesFilter/СompaniesFilter";

function Filters({
  baseFlights,
  handleChange,
  filters,
  handleCompaniesChange,
  airCompanyFilters,
}) {
  return (
    <div className="filters-block">
      <Sort onChange={handleChange} />
      <TransferFilter onChange={handleChange} />
      <PriceFilter onChange={handleChange} filters={filters} />
      <CompaniesFilter
        baseFlights={baseFlights}
        onChange={handleCompaniesChange}
        airCompanyFilters={airCompanyFilters}
      />
    </div>
  );
}

export default Filters;
