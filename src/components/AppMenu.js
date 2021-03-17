import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  CardContent,
} from "@material-ui/core";
import CardBox from "./CardBox";
import { sortData } from "../utils/sortUtil";
import "./AppMenu.css";

function AppMenu(props) {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryData, setCountryData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [fetchMapData, setFetchMapData] = useState([]);
  const [inputCases, setInputCases] = useState("cases");

  useEffect(() => {
    const getCountriesData = () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2,
            };
          });
          setCountries(countries);
          setTableData(sortData(data));
          setFetchMapData(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryData(data);
      });
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data);
      });
  }, []);

  useEffect(() => {
    props.sideBarData(tableData);
    props.mapData(fetchMapData);
    const countryInfo = countryData.countryInfo;
    if (countryInfo) {
      props.dynCountry(countryInfo);
    }
  }, [tableData, countryData, fetchMapData]);

  props.onCasesChange(inputCases);

  return (
    <div className="menu">
      <CardContent>
        <h2>
          <span style={{ color: "red" }}>Live</span> Covid Cases
        </h2>
        <FormControl className="menu__dropdown">
          <Select onChange={onCountryChange} value={country} variant="outlined">
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => {
              return (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>

      <div className="menu__details">
        <CardBox
          active={inputCases === "cases"}
          caseColor
          onClick={(e) => setInputCases("cases")}
          cases={countryData.todayCases}
          total={countryData.cases}
          title="Confirmed"
        />
        <CardBox
          active={inputCases === "recovered"}
          recColor
          onClick={(e) => setInputCases("recovered")}
          className="card-recovered"
          cases={countryData.todayRecovered}
          total={countryData.recovered}
          title="Recovered"
        />
        <CardBox
          active={inputCases === "deaths"}
          deathColor
          onClick={(e) => setInputCases("deaths")}
          cases={countryData.todayDeaths}
          total={countryData.deaths}
          title="Deaths"
        />
      </div>
    </div>
  );
}

export default AppMenu;
