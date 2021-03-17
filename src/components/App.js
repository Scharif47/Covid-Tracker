import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import AppMenu from "./AppMenu";
import Table from "./Table";
import Diagram from "../components/Diagram";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 52.4912, lng: -1.9348 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [inputCases, setInputCases] = useState("cases");

  const sideData = (tableData) => {
    setCountryData(tableData);
  };

  const dynCountry = (countryInfo) => {
    if (countryInfo) {
      setMapCenter([countryInfo.lat, countryInfo.long]);
      setMapZoom(4);
    }
  };

  const mapData = (fetchMapData) => {
    setMapCountries(fetchMapData);
  };

  const onCasesChange = (inputCases) => {
    setInputCases(inputCases);
  }

  return (
    <div className="app">
      <div className="app__main">
        <h1>Covid-Tracker</h1>

        <Card className="app__menu">
          <AppMenu
            onCasesChange={onCasesChange}
            dynCountry={dynCountry}
            mapData={mapData}
            sideBarData={sideData}
          />
        </Card>

        <Map
          inputCases={inputCases}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__side">
        <CardContent>
          <h3 className="app__tableTitle">Cases by Country</h3>
          <Table countries={countryData} />
          <h3 className="app__diagramTitle">Worldwide {inputCases}</h3>
          <Diagram className="app__diagram" inputCases={inputCases} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
