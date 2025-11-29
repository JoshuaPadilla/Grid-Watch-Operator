import React from "react";
import { useDeviceStore } from "../../store/useDeviceStore";
import { formatDate } from "../../app/helpers/date_formatter";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { payload } from "../../app/dev-data/payload-data";
import { usePayloadStore } from "../../store/usePayloadStore";
import {
  ClipLoader,
  MoonLoader,
  PacmanLoader,
  PuffLoader,
  ScaleLoader,
} from "react-spinners";

function DeviceInfo() {
  const { focusedDevice } = useDeviceStore();

  const { deviceLast20Payloads, loading } = usePayloadStore();
  console.log(deviceLast20Payloads);

  const deviceFields = [
    { label: "Device ID:", value: focusedDevice?.deviceId, size: "text-xl" },
    { label: "Status:", value: focusedDevice?.status, size: "text-xl" },
    {
      label: "Location:",
      value: `${focusedDevice?.locationName?.road} ${focusedDevice?.locationName?.brgy}, ${focusedDevice?.locationName?.city}`,
      size: "text-lg",
    },
    {
      label: "Coordinates:",
      value: `${focusedDevice?.locationCoordinates?.lat || ""}, ${
        focusedDevice?.locationCoordinates?.lng || ""
      }`,
      size: "text-xl",
    },
    {
      label: "Date Installed:",
      value: formatDate(focusedDevice?.createdAt || ""),
      size: "text-xl",
    },
  ];

  return (
    <div className="flex flex-row flex-1 gap-2 h-full">
      {/* Device info */}
      <div className="bg-(--card_bg) flex-1 p-4 rounded-sm min-w-[40%]">
        <h3 className="text-white font-semibold text-2xl mb-2">Device Info</h3>

        <div className="grid grid-cols-3 gap-2 text-white">
          {deviceFields.map((item) => (
            <>
              <p className={`${item.size} text-left`}>{item.label}</p>

              {/* Value (Second column) */}
              <p className={`${item.size} font-bold col-span-2`}>
                {item.value?.toString() ?? ""}
              </p>
            </>
          ))}
        </div>
      </div>

      {/* Voltage */}
      <div
        className={`${
          loading && "flex justify-center items-center"
        } bg-(--card_bg) flex-1 p-4 rounded-sm overflow-y-clip max-w-[30%]`}
      >
        <MoonLoader
          size={120}
          color="
        #359eff"
          loading={loading}
        />
        {!loading && (
          <>
            <h3 className="text-white font-semibold text-2xl mb-2">
              Voltage Readings
            </h3>

            <h3 className="text-white font-semibold text-3xl mb-2">~ 245V</h3>

            <div className="overflow-x-auto hide-scrollbar">
              <AreaChart
                style={{
                  width: payload.length * 80,
                  height: 180,
                }}
                responsive
                data={deviceLast20Payloads}
                margin={{
                  top: 20,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(56, 99, 160, 0.635)"
                />
                <YAxis width="auto" dataKey="voltage" />
                <XAxis
                  dataKey="createdAt"
                  width="auto"
                  tickLine={{ stroke: "#FFF" }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="voltage"
                  stroke="#359eff"
                  fill="#359eff"
                />
              </AreaChart>
            </div>
          </>
        )}
      </div>

      {/* Current */}
      <div
        className={`${
          loading && "flex justify-center items-center"
        } bg-(--card_bg) flex-1 p-4 rounded-sm overflow-y-clip max-w-[30%]`}
      >
        <MoonLoader
          size={120}
          color="
        #359eff"
          loading={loading}
        />
        {!loading && (
          <>
            <h3 className="text-white font-semibold text-2xl mb-2">
              Current Readings
            </h3>

            <h3 className="text-white font-semibold text-3xl mb-2">~ 220A</h3>

            <div className="overflow-x-auto hide-scrollbar">
              <AreaChart
                style={{
                  width: payload.length * 80,
                  height: 180,
                }}
                responsive
                data={deviceLast20Payloads}
                margin={{
                  top: 20,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(56, 99, 160, 0.635)"
                />
                <YAxis width="auto" dataKey="current" />
                <XAxis
                  dataKey="createdAt"
                  width="auto"
                  tickLine={{ stroke: "#FFF" }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="voltage"
                  stroke="#359eff"
                  fill="#359eff"
                />
              </AreaChart>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeviceInfo;
