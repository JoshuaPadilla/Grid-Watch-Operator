import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

export const DeviceReportMap = () => {
  return (
    <div className="row-span-3 col-span-3 bg-white rounded-2xl overflow-clip">
      <MapContainer
        center={[12.067464704041424, 124.5924237721899]}
        zoom={22}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
