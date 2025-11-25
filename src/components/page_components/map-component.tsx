import React, { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { popupIcon } from "../popupIcon";
import { useGeoCodeStore } from "../../store/useGeocode";

const MapComponent = () => {
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    12.068560089554783, 124.59141719142677,
  ]);

  const { getLocationName } = useGeoCodeStore();

  useEffect(() => {
    const result = getLocationName(
      mapPosition[0].toString(),
      mapPosition[1].toString()
    );

    console.log("Result!!!:", result);
  }, [getLocationName, mapPosition]);
  return (
    <MapContainer
      center={mapPosition}
      zoom={16}
      scrollWheelZoom={false}
      className="h-full w-full "
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {/* <TileLayer
        // The standard and most reliable OpenStreetMap URL
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      /> */}

      <Marker
        position={[12.067902291074136, 124.59411950590255]}
        icon={popupIcon}
      >
        <Popup>{}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
