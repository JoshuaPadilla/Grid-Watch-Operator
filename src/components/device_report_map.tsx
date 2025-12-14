import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { useDeviceStore } from "../store/useDeviceStore";
import { getDevicePopUpIcon } from "../app/helpers/getDevicePopUpIcon";

export const DeviceReportMap = () => {
  const { focusedDevice } = useDeviceStore();

  const center: [number, number] = focusedDevice
    ? [
        Number(focusedDevice?.locationCoordinates?.lat),
        Number(focusedDevice.locationCoordinates?.lng),
      ]
    : [12.067464704041424, 124.5924237721899];

  const icon = getDevicePopUpIcon(focusedDevice?.status);

  return (
    <div className="row-span-3 col-span-3 bg-white rounded-2xl overflow-clip">
      <MapContainer
        center={center}
        zoom={22}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="topright" />

        <Marker position={center} icon={icon}>
          <Popup>
            {`${focusedDevice?.locationName?.road} ${focusedDevice?.locationName?.brgy}, ${focusedDevice?.locationName?.city}`}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
