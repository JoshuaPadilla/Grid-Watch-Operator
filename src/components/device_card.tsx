import React, { useDebugValue } from "react";
import type { Device } from "../interfaces/device.interface";
import { useDeviceStore } from "../store/useDeviceStore";
import { usePayloadStore } from "../store/usePayloadStore";
import socket from "../lib/socket";

interface Props {
  device: Device;
}

function DeviceCard({ device }: Props) {
  const { setFocusedDevice, focusedDevice } = useDeviceStore();

  const { getDeviceLast20Payloads } = usePayloadStore();

  const handleViewDevice = () => {
    if (focusedDevice && focusedDevice.deviceId !== device.deviceId) {
      socket.emit("disconnectDevice", { deviceId: focusedDevice.deviceId });
    }

    setFocusedDevice(device);
    getDeviceLast20Payloads(device.deviceId);
    socket.emit("connectDevice", { deviceId: device.deviceId });
  };

  return (
    <li className="px-4 py-2 bg-white rounded-lg shadow-lg border-l-8 border-(--safe)">
      <div className="flex flex-row justify-between items-center mb-1">
        <div className="flex flex-row gap-2">
          <p>Device ID:</p>
          <p>{device.deviceId}</p>
        </div>

        <button
          className="px-2 bg-(--primary)/70 rounded-md font-light text-sm"
          onClick={handleViewDevice}
        >
          View
        </button>
      </div>

      <div className="flex flex-row gap-2">
        <p>Location:</p>
        <p>{`${device.locationName?.road} ${device.locationName?.brgy}`}</p>
      </div>
    </li>
  );
}

export default DeviceCard;
