import React from 'react';
import "./Map.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { showDataOnMap } from "./utl";
import "leaflet/dist/leaflet.css";

// const {Map, Marker, Popup, TileLayer} = require("react-leaflet");

const MapData=({countries,center,zoom}) => {
  console.log(center);
  console.log(zoom)
    return (
      
        <div className="map">
        <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
          
         {showDataOnMap(countries)}
        </MapContainer>
            
        </div>
    )
}

export default MapData;
