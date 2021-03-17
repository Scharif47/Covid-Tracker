import React from "react";
import {Circle, Popup} from "react-leaflet";
import numeral from "numeral"

const casesColors = {
  cases: {
    hex: "#8B0000",
    multiplier: 250,
  },
  recovered: {
    hex: "#228B22",
    multiplier: 250,
  },
  deaths: {
    hex: "#4B0082",
    multiplier: 800,
  },
};

export const mapData = (data, inputCases = "cases") => {
  return data.map((country) => {
    return (
      <Circle 
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      // color={casesColors[inputCases].hex}
      pathOptions={{
        color: casesColors[inputCases].hex
      }}
      radius={Math.sqrt(country[inputCases]) * casesColors[inputCases].multiplier}
      >
        <Popup>
        <div className="popup">
            <div
              className="popup__flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            />
            <div className="popup__name">{country.country}</div>
            <div className="popup__cases">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="popup__recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="popup__deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    )
  })
}