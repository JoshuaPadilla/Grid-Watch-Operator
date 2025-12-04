import React from "react";
import type { History } from "../interfaces/history.interface";
import type { Device } from "../interfaces/device.interface";
import { getDeviceStatusText } from "../app/helpers/getDeviceStatusText";
import { getDeviceStatusColor } from "../app/helpers/getDeviceStatusColor";
import { Icons } from "../constants/icons.constant";

interface Props {
  device: Device | undefined;
  history: History;
}

export const HistoryDetails = ({ device, history }: Props) => {
  const statusColor = getDeviceStatusColor(device?.status);

  return (
    <div className="backdrop-blur-lg z-1000 p-4 bg-white/30 bottom-8 absolute w-[90%] rounded-xl flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <h3 className="font-semibold text-lg">{history.title}</h3>

        <div
          className={` px-4 py-2 rounded-lg`}
          style={{ backgroundColor: statusColor }}
        >
          <h2 className="font-bold text-white">
            {getDeviceStatusText(device?.status || "no_power")}
          </h2>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <img src={Icons.location} className="size-[30px]" />

        <h3>
          {device?.locationName?.road}, {device?.locationName?.brgy}{" "}
          {device?.locationName?.city}
        </h3>
      </div>

      <div className="bg-white/80 p-4 rounded-lg">
        <p className="font-medium text-lg">{history.body}</p>
      </div>
    </div>
  );
};
