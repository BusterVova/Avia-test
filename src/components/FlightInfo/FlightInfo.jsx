import React from "react";
import moment from "moment";
import "./FlightInfo.scss";
import "moment/locale/ru";

const FlightInfo = ({carrier, leg}) => {
  moment.locale("ru");
  let flightMinutes = leg.duration / 60;
  let timeArr = flightMinutes.toFixed(2).split(".");
  timeArr[0] = 0;
  return (
    <div>
      <div className="flight">
        <p className="flight-cities">
          {leg.segments[0].departureCity.caption},
          {leg.segments[0].departureAirport.caption}
          <span className="blue-content">
            {`(${leg.segments[0].departureAirport.uid})`}
          </span>
          <span className="blue-content arrow">→</span>
          {leg.segments[1]
            ? leg.segments[1].arrivalCity.caption
            : leg.segments[0].arrivalCity.caption}
          ,
          {leg.segments[1]
            ? leg.segments[1].arrivalAirport.caption
            : leg.segments[0].arrivalAirport.caption}
          <span className="blue-content">{`(${
            leg.segments[1]
              ? leg.segments[1].arrivalAirport.uid
              : leg.segments[0].arrivalAirport.uid
          })`}</span>
        </p>
      </div>
      {
        <div className="flight-info">
          <div className="flight-route">
            <div>
              {moment(leg.segments[0].departureDate).format("HH:mm")}
              <span className="blue-content ">
                {moment(leg.segments[0].departureDate).format("D")}
              </span>
              <span className="blue-content">
                {moment(leg.segments[0].departureDate).format("MMM")}
              </span>
              <span className="blue-content">
                {moment(leg.segments[0].departureDate).format("dd")}
              </span>
            </div>
            <div className="flight-time">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-clock clock-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
                &nbsp;
                {`${Math.floor(leg.duration / 60)} ч`}&nbsp;
                {`${Math.round(timeArr.join(".") * 60)} мин`}
            </div>
            <div>
              <span className="blue-content">
                {moment(
                  leg.segments[1]
                    ? leg.segments[1].arrivalDate
                    : leg.segments[0].arrivalDate
                ).format("dd")}
              </span>
              <span className="blue-content">
                {moment(
                  leg.segments[1]
                    ? leg.segments[1].arrivalDate
                    : leg.segments[0].arrivalDate
                ).format("MMM")}
              </span>
              <span className="blue-content">
                {moment(
                  leg.segments[1]
                    ? leg.segments[1].arrivalDate
                    : leg.segments[0].arrivalDate
                ).format("D")}
              </span>
              <span className="flight-arrival">
                {moment(
                  leg.segments[1]
                    ? leg.segments[1].arrivalDate
                    : leg.segments[0].arrivalDate
                ).format("HH:mm")}
              </span>
            </div>
          </div>
          <div className="flight-transfers">
            {leg.segments.length > 1 ? <span>1 пересадка</span> : null}
          </div>
        </div>
      }
      <div>
        <div className="flight-company">{`Рейс выполняет: ${carrier.caption}`}</div>
      </div>
    </div>
  );
};

export default FlightInfo;
