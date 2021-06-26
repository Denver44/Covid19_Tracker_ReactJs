import React, { useState } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "../utils/util.js";

function Map({ countries, casesType, position, zoom }) {
  const [map, setMap] = useState(null);
  if (map) {
    map.flyTo(position);
  }

  return (
    <div className="map">
      <LeafletMap center={position} zoom={zoom} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
