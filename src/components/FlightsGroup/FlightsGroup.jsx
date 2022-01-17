import React from 'react'
import FlightInfo from '../FlightInfo/FlightInfo'
import './FlightsGroup.scss'

const FlightsGroup = ({
  flightInfo: {
    flight: {
      carrier,
      price: { total },
      legs: [leg1, leg2],
    },
  },
}) => {

  return (
    <div className="flights-group">
      <div className="flights-navbar">
        <div>{carrier.caption}</div>
        <div className="flights-price">
          <div className="flights-price__amount">{total.amount} Р</div>
          <p className="flights-price__paragraph">
            Стоимость для одного взрослого пассажира
          </p>
        </div>
      </div>
      <FlightInfo carrier={carrier} leg={leg1} />
      <div className="flights-divider" />
      <FlightInfo carrier={carrier} leg={leg2} />
      <button className="add-button">ВЫБРАТЬ</button>
    </div>
  )
}

export default FlightsGroup