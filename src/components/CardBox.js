import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import numeral from "numeral";
import "./CardBox.css";

function CardBox({
  cases,
  total,
  title,
  active,
  caseColor,
  recColor,
  deathColor,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`cardBox ${active && "cardBox--selected"} ${
        caseColor && "cardBox--red"
      } ${recColor && "cardBox--green"} ${deathColor && "cardBox--purple"}`}
    >
      <CardContent>
        <h3 className="cardBox__total">{numeral(total).format("0,0")}</h3>

        <Typography className="cardBox__cases" color="textSecondary">
          +{numeral(cases).format("0,0")} new cases
        </Typography>

        <Typography className="cardBox__title" color="textPrimary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardBox;
