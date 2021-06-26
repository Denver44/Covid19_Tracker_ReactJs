import React from "react";
import InfoBox from "../InfoBox/InfoBox";

const AppStats = ({ countryInfo, setCasesType, casesType }) => {
  return (
    <>
      <InfoBox
        key="allCases"
        color="Orange"
        active={casesType === "cases"}
        onClick={() => setCasesType("cases")}
        title="Total Cases"
        cases={countryInfo.todayCases}
        total={countryInfo.cases}
      />
      <InfoBox
        key="recovered"
        color="Green"
        active={casesType === "recovered"}
        onClick={() => setCasesType("recovered")}
        title="Recovered"
        cases={countryInfo.todayRecovered}
        total={countryInfo.recovered}
      />
      <InfoBox
        key="deaths"
        color="Red"
        active={casesType === "deaths"}
        onClick={() => setCasesType("deaths")}
        title="Deaths"
        cases={countryInfo.todayDeaths}
        total={countryInfo.deaths}
      />
    </>
  );
};

export default AppStats;
