import React, { useState, useEffect } from "react";
import Filters from "./components/Filters/Filters";
import FlightsList from "./components/FlightsList/FlightsList";
import "./App.scss";
import API from "./API/flights.json";

const App = () => {
  const [flights] = useState(API.result.flights);
  const [baseFlights, setBaseFlights] = useState([flights[0], flights[1]]);
  const [filters, setFilters] = useState({
    sort: "",
    transferFilter: "",
    noTransferFilter: "",
    priceFilterFrom: "",
    priceFilterTo: "",
  });
  const [airCompanyFilters, setAirCompanyFilters] = useState({});

  const sortFlights = (filters) => {
    if (filters.sort === "increase") {
      baseFlights.sort(
        (a, b) => a.flight.price.total.amount - b.flight.price.total.amount
      );
    }
    if (filters.sort === "decrease") {
      baseFlights.sort(
        (a, b) => b.flight.price.total.amount - a.flight.price.total.amount
      );
    }
    if (filters.sort === "time") {
      baseFlights.sort(
        (a, b) =>
          a.flight.legs[0].duration +
          a.flight.legs[1].duration -
          (b.flight.legs[0].duration + b.flight.legs[1].duration)
      );
    }
    if (
      filters.transferFilter === "1 transfer" &&
      filters.noTransferFilter === "no transfers"
    ) {
      return baseFlights;
    }

    if (filters.noTransferFilter === "no transfers") {
      return baseFlights.filter(
        (flight) =>
          flight.flight.legs[0].segments.length === 1 &&
          flight.flight.legs[1].segments.length === 1
      );
    }

    if (filters.TransferFilter === "1 transfer") {
      return baseFlights.filter(
        (flight) =>
          flight.flight.legs[0].segments.length !== 1 &&
          flight.flight.legs[1].segments.length !== 1
      );
    }
    if (filters.priceFilterFrom && filters.priceFilterTo) {
      return baseFlights.filter(
        (flight) =>
          +filters.priceFilterFrom <= +flight.flight.price.total.amount &&
          +filters.priceFilterTo >= +flight.flight.price.total.amount
      );
    }
    if (filters.priceFilterFrom) {
      return baseFlights.filter(
        (flight) =>
          +filters.priceFilterFrom <= +flight.flight.price.total.amount
      );
    }
    if (filters.priceFilterTo) {
      return baseFlights.filter(
        (flight) => +filters.priceFilterTo >= +flight.flight.price.total.amount
      );
    }

    return baseFlights;
  };

  const handleChange = (target) => {
    setFilters((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleCompaniesChange = (target) => {
    setAirCompanyFilters((prevState) => ({
      ...prevState,
      [target.name]: {
        ...prevState[target.name],
        status: !prevState[target.name].status,
      },
    }));
  };

  useEffect(() => {
    const companyFilters = baseFlights.reduce((acc, {flight}) => {
      const companyName = flight.carrier.caption;
      const companyPrice = flight.price.total.amount

      if (!acc[companyName]) {
        acc[companyName] = {
          status: false,
          price: +companyPrice
        }
      } else {
        acc[companyName].price = companyPrice < acc[companyName].price ? companyPrice : acc[companyName].price
      }

      return acc
    }, {})

    setAirCompanyFilters(companyFilters)
  }, []);

  useEffect(() => {
    const lastCompany = baseFlights[baseFlights.length - 1];
    const lastCompanyName = lastCompany.flight.carrier.caption;
    const lastCompanyPrice = lastCompany.flight.price.total.amount;
    setAirCompanyFilters((prev) => {
      const alreadyExists = prev[lastCompanyName]
      if (alreadyExists) {
        return {
          ...prev,
          [lastCompanyName]: {
            status: prev[lastCompanyName].status,
            price: lastCompanyPrice < prev[lastCompanyName].price ? lastCompanyPrice : prev[lastCompanyName].price
          },
        }
      } else {
        return {
          ...prev,
          [lastCompanyName]: {
            status: false,
            price: lastCompanyPrice
          }
        }
      }
    });
  }, [baseFlights]);

  return (
    <div className="container">
      <Filters
        airCompanyFilters={airCompanyFilters}
        baseFlights={sortFlights(filters)}
        filters={filters}
        handleChange={handleChange}
        handleCompaniesChange={handleCompaniesChange}
      />
      <FlightsList
        flights={flights}
        baseFlights={sortFlights(filters)}
        setBaseFlights={setBaseFlights}
        sortFlights={sortFlights}
        filters={filters}
        airCompanyFilters={airCompanyFilters}
      />
    </div>
  );
};
export default App;
