import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getCountryDataByDays } from "../Api/api";
import { BuildChart, casesTypeColors, options } from "../utils/util";

const Graph = (props) => {
  const { casesType } = props;
  const [data, setData] = useState({});
  const handleFetchCasesByDays = (days, casesType) => {
    const result = getCountryDataByDays(`/historical/all?lastdays=${days}`);
    result.then(({ data }) => {
      let chartData = BuildChart(data, casesType);
      setData(chartData);
    });
  };
  useEffect(() => {
    handleFetchCasesByDays(120, casesType);
  }, [casesType]);

  return (
    <div className="graph">
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: casesTypeColors[casesType].half_op,
                borderColor: casesTypeColors[casesType].hex,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default Graph;
