import React from "react";
import DeviceCard from "../device_card";
import { useDeviceStore } from "../../store/useDeviceStore";

interface Props {
  showAddDevice: (show: boolean) => void;
}

function DeviceList({ showAddDevice }: Props) {
  const { devices } = useDeviceStore();

  return (
    <div className="w-full h-full bg-(--card_bg) p-4 rounded-2xl items-center">
      {/* Header */}
      <div className="flex flex-row justify-between mb-4">
        <h3 className="font-bold text-xl text-white">Active Devices: 8</h3>

        <button
          className="bg-(--primary) px-2 rounded-md"
          onClick={() => showAddDevice(true)}
        >
          <p className="font-semibold text-sm text-white">Add device</p>
        </button>
      </div>

      {/* list */}
      <ul className="flex flex-col gap-2 h-[85%] list-none overflow-y-scroll">
        {devices.map((device) => (
          <DeviceCard device={device} key={device._id} />
        ))}
      </ul>
    </div>
  );
}

export default DeviceList;
