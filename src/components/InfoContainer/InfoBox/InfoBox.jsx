import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import { prettyPrintStat } from "../../utils/util.js";

const SelectColor = {
  borderColorClass: {
    Green: "infoBoxSelectedGreen",
    Red: "infoBoxSelectedRed",
    Orange: "infoBoxSelectedOrange",
  },
  textColorClass: {
    Green: "infoBoxTextGreen",
    Red: "infoBoxTextRed",
    Orange: "infoBoxTextOrange",
  },
};

const InfoBox = (props) => {
  const { title, cases, color, active, total, onClick } = props;
  return (
    <Card
      onClick={onClick}
      className={`infoBox ${
        color === "Green" && active
          ? SelectColor?.borderColorClass[color]
          : color === "Red" && active
          ? SelectColor?.borderColorClass[color]
          : color === "Orange" && active
          ? SelectColor?.borderColorClass[color]
          : null
      }`}
    >
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>

        <h2
          className={`infoBox_cases  ${
            color === "Green"
              ? SelectColor?.textColorClass[color]
              : color === "Red"
              ? SelectColor?.textColorClass[color]
              : color === "Orange"
              ? SelectColor?.textColorClass[color]
              : null
          }`}
        >
          {prettyPrintStat(cases)}
        </h2>
        <Typography className="infoBox_total" color="textSecondary">
          {prettyPrintStat(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
