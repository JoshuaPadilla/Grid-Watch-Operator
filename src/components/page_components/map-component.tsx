import { useEffect } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { popupIcon } from "../popupIcon";
import { useDeviceStore } from "../../store/useDeviceStore";
import MapCenterController from "../mapCenterController";
import { getDevicePopUpIcon } from "../../app/helpers/getDevicePopUpIcon";

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
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapCenterController
        locationCoordinates={focusedDevice?.locationCoordinates || null}
      />

      {devices.length > 0 &&
        devices.map((device, index) => {
          const icon = getDevicePopUpIcon(device.status);
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
              icon={icon}
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
