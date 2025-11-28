import React, { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { popupIcon } from "../popupIcon";
import { useGeoCodeStore } from "../../store/useGeocode";
import { useDeviceStore } from "../../store/useDeviceStore";
import type { Device } from "../../interfaces/device.interface";
import MapCenterController from "../mapCenterController";

const MapComponent = () => {
  const { getDevices, devices, focusedDevice } = useDeviceStore();

  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return (
    <MapContainer
      center={[12.067464704041424, 124.5924237721899]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full "
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      <MapCenterController
        locationCoordinates={focusedDevice?.locationCoordinates || null}
      />

      {devices.length > 0 &&
        devices.map((device, index) => {
          return (
            <Marker
              key={device._id ?? index}
              position={
                device.locationCoordinates
                  ? [
                      Number(device.locationCoordinates?.lat),
                      Number(device.locationCoordinates?.lng),
                    ]
                  : [0, 0]
              }
              icon={popupIcon}
            >
              <Popup>
                {`${device.locationName?.road} ${device.locationName?.brgy}, ${device.locationName?.city}`}
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default MapComponent;
