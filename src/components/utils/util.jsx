import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

const casesTypeColors = {
  cases: {
    hex: "#ffa500",
    rgb: "rgb(255, 165,0)",
    half_op: "rgba(255, 165, 0, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

// Draw circle on the map with intertctive tooltip
export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      radius={
        10 *
        Math.sqrt(country[casesType] * casesTypeColors[casesType].multiplier)
      }
    >
      {console.log("CASES ", casesType)}
      {console.log("data ", data)}
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0a")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0a")}
          </div>
          <div className="info-death">
            Deaths: {numeral(country.deaths).format("0a")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// if stat exist then do other wise +0.
