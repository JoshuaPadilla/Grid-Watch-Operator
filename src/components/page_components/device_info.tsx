import React, { useEffect, useState } from "react";
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
import socket from "../../lib/socket";
import { useNavStore } from "../../store/useNavStore";
import { NAVIGATION } from "../../types/nav.type";

function DeviceInfo() {
  const { focusedDevice } = useDeviceStore();
  const [voltageData, setVoltageData] = useState(0);
  const [currentData, setCurrentData] = useState(0);
  const { changeNav } = useNavStore();

  const {
    deviceLast20Payloads,
    loading,
    updateDeviceLast20Payloads,
    getLatestPayload,
  } = usePayloadStore();

  useEffect(() => {
    const fetchLatestPayload = async () => {
      if (focusedDevice) {
        const latestPayload = await getLatestPayload(focusedDevice.deviceId);

        if (latestPayload) {
          setCurrentData(latestPayload.current);
          setVoltageData(latestPayload.voltage);
        }
      }
    };

    fetchLatestPayload();
  }, [focusedDevice, getLatestPayload]);

  useEffect(() => {
    socket.on("sensorPayload", (data) => {
      updateDeviceLast20Payloads(data);
      setCurrentData(data.current);
      setVoltageData(data.voltage);
    });

    socket.on("notification", (data) => {
      console.log(data);
    });
  }, [updateDeviceLast20Payloads]);

  const handleViewReport = () => {
    changeNav(NAVIGATION.INSIGHTS, false);
  };

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
    <div className="flex flex-row flex-1 gap-2 h-full overflow-clip">
      {/* Device info */}
      <div className="relative bg-(--card_bg) flex-1 p-4 rounded-sm min-w-[40%]">
        <button
          className="px-4 py-1 bg-(--primary) rounded-sm text-white text-md font-semibold absolute right-8 hover:bg-(--primary)/40"
          onClick={handleViewReport}
        >
          View Report
        </button>

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

            <h3 className="text-white font-semibold text-3xl mb-2">
              ~ {voltageData}V
            </h3>

            <div className="overflow-x-auto hide-scrollbar">
              <AreaChart
                style={{
                  width: deviceLast20Payloads.length * 40,
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
                  dataKey="localCreatedAt"
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

            <h3 className="text-white font-semibold text-3xl mb-2">
              ~ {currentData}A
            </h3>

            <div className="overflow-x-auto hide-scrollbar">
              <AreaChart
                style={{
                  width: deviceLast20Payloads.length * 40,
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
                  dataKey="localCreatedAt"
                  width="auto"
                  tickLine={{ stroke: "#FFF" }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="current"
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
