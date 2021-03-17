import React from "react";
import "./Map.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { mapData } from "../utils/mapData";

function Map({ center, zoom, countries, inputCases }) {
  function MyComponent() {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <MyComponent />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapData(countries, inputCases)}
      </MapContainer>
    </div>
  );
}

export default Map;
