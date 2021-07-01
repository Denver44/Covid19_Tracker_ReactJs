import React from "react";
import numeral from "numeral";
import MapPopup from "../Maps/MapPopup/MapPopup";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) =>
  [...data].sort((a, b) => (a.cases > b.cases ? -1 : 1));

export const capitalize = (data) =>
  data.charAt(0).toUpperCase() + data.slice(1);

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

export const BuildChart = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

export const casesTypeColors = {
  cases: {
    hex: "#ffa500",
    rgb: "rgb(255, 165,0)",
    half_op: "rgba(255, 165, 0, 0.5)",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 400,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};
export const showDataOnMap = (data, casesType) => {
  return Array.isArray(data) ? (
    data?.map((country) => (
      <Circle
        pathOptions={{
          color: casesTypeColors[casesType].hex,
          fillColor: casesTypeColors[casesType].hex,
        }}
        center={[country?.countryInfo?.lat, country?.countryInfo?.long]}
        fillOpacity={0.4}
        radius={
          10 *
          Math.sqrt(country[casesType] * casesTypeColors[casesType].multiplier)
        }
      >
        <Popup>
          <MapPopup
            key={country?.country}
            flag={country?.countryInfo?.flag}
            country={country?.country}
            cases={country?.cases}
            recovered={country?.recovered}
            deaths={country?.deaths}
          />
        </Popup>
      </Circle>
    ))
  ) : (
    <Circle
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      center={[data?.countryInfo?.lat, data?.countryInfo?.long]}
      fillOpacity={0.4}
      radius={
        12 * Math.sqrt(data[casesType] * casesTypeColors[casesType].multiplier)
      }
    >
      <Popup>
        <MapPopup
          flag={data?.countryInfo?.flag}
          country={data?.country}
          cases={data?.cases}
          recovered={data?.recovered}
          deaths={data?.deaths}
        />
      </Popup>
    </Circle>
  );
};
