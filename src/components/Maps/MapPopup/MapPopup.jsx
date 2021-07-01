import React from "react";
import numeral from "numeral";

const formatRecord = (data) => numeral(data).format("0a");

const MapPopup = ({ flag, cases, recovered, deaths, country }) => {
  return (
    <div className="info-container">
      <div
        className="info-flag"
        style={{
          backgroundImage: `url(${flag})`,
        }}
      />
      <div className="info-name">{country}</div>
      <div className="info-confirmed">Cases: {formatRecord(cases)}</div>
      <div className="info-recovered">Recovered: {formatRecord(recovered)}</div>
      <div className="info-death">Deaths: {formatRecord(deaths)}</div>
    </div>
  );
};

export default MapPopup;
