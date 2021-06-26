import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import Map from "./components/Maps/Map.jsx";
import Table from "./components/Table/Table.jsx";
import Graph from "./components/Graph/Graph.jsx";
import "leaflet/dist/leaflet.css";
import "./app.css";
import icon from "./images/coronavirus.png";
import {
  getCountriesData,
  getCountryChangeData,
  handleFetchData,
} from "./components/Api/api.js";

import AppStats from "./components/AppStats/AppStats.jsx";
import { sortData } from "./components/utils/util.js";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState([21.52, 76.34]);
  const [mapZoom, setMapZoom] = useState(4);

  const fetchAllData = () => {
    const result = handleFetchData("/all");
    result
      .then(({ data }) => setCountryInfo(data))
      .catch((error) => console.log(error));
  };

  const fetchCountriesData = () => {
    const result = getCountriesData("/countries");
    result
      .then(({ data }) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setCountries(countries);
        setMapCountries(data);
        setTableData(sortData(data));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAllData();
    fetchCountriesData();
  }, []);

  const fetchOnCountryChangeData = (url, CountryCode) => {
    const result = getCountryChangeData(url);
    result
      .then(({ data }) => {
        setCountry(CountryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(14);
      })
      .catch((error) => console.log(error));
  };
  const onCountryChange = (e) => {
    const CountryCode = e.target.value;
    const url =
      CountryCode === "Worldwide" ? `/all ` : `/countries/${CountryCode}`;
    fetchOnCountryChangeData(url, CountryCode);
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <div className="header__icon">
            <img src={icon} alt="icon_image" className="app_headerIcon" />
            <h1>COVID-19 TRACKER</h1>
          </div>

          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <AppStats
            {...{
              countryInfo,
              casesType,
              setCasesType,
            }}
          />
        </div>

        <Map
          countries={mapCountries}
          casesType={casesType}
          position={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData}></Table>
          <h3>Worldwide new {casesType}</h3>
          <Graph className="graph" casesType={casesType}></Graph>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
