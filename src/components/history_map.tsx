import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapCenterController from "./mapCenterController";
import type { Device } from "../interfaces/device.interface";
import { getDevicePopUpIcon } from "../app/helpers/getDevicePopUpIcon";

interface Props {
  device: Device | undefined;
}

export const HistoryMap = ({ device }: Props) => {
  const icon = getDevicePopUpIcon(device?.status);
  return (
    <MapContainer
      center={[12.067464704041424, 124.5924237721899]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {device && (
        <Marker
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
      )}

      <MapCenterController
        locationCoordinates={device?.locationCoordinates || null}
      />
    </MapContainer>
  );
};
