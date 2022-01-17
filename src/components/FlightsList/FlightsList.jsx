import React, { useState } from "react";
import FlightsGroup from "../FlightsGroup/FlightsGroup";

import "./FlightsList.scss";
const FlightsList = ({
  baseFlights,
  setBaseFlights,
  flights,
  filters,
  airCompanyFilters,
}) => {
  const [amount, setAmount] = useState(2);
  const addFlight = () => {
    setAmount((prev) => prev + 1);
    setBaseFlights((prev) => [...prev, flights[amount]]);
  };

  const hasActiveFilters = Object.keys(airCompanyFilters).some(
    (name) => airCompanyFilters[name].status
  );

  return (
    <div className="flights-container">
      {baseFlights.map((flight) => {
        const component = (
          <FlightsGroup key={flight.flightToken} flightInfo={flight} />
        );
        const hasActiveFilter = Object.keys(airCompanyFilters).some(
          (item) => airCompanyFilters[item].status
        );
        if (hasActiveFilter) {
          return airCompanyFilters[flight.flight.carrier.caption].status
            ? component
            : null;
        } else {
          return component;
        }
      })}

      {baseFlights.length && !hasActiveFilters ? (
        <div className="show-button-wrapper">
          <button className="show-button" onClick={addFlight}>
            Показать еще
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FlightsList;
