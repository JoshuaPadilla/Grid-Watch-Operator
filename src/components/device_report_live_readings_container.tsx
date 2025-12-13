import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { usePayloadStore } from "../store/usePayloadStore";
import { useDeviceStore } from "../store/useDeviceStore";
import { Skeleton } from "@mui/material";
import { getDeviceStatusColor } from "../app/helpers/getDeviceStatusColor";

export const DeviceReportLiveReadingsContainer = () => {
  const [voltageReadings, setVoltageReadings] = useState(0);
  const [currentReadings, setCurrentReadings] = useState(0);
  const [currentData, setCurrentData] = useState<number[]>([]);
  const [voltageData, setVoltageData] = useState<number[]>([]);
  const [seriesData, setSeriesData] = useState<string[]>([]);

  const { getDeviceLast20Payloads, getLatestPayload, loading } =
    usePayloadStore();
  const { focusedDevice } = useDeviceStore();

  useEffect(() => {
    const fetchLatestPayload = async () => {
      if (focusedDevice) {
        const last20Payloads = await getDeviceLast20Payloads(
          focusedDevice.deviceId
        );

        if (last20Payloads) {
          setVoltageData(last20Payloads.map((item) => item.voltage));
          setCurrentData(last20Payloads.map((item) => item.current));
        }

        const latestPayload = await getLatestPayload(focusedDevice.deviceId);

        if (latestPayload) {
          setCurrentReadings(latestPayload.current);
          setVoltageReadings(latestPayload.voltage);
          setSeriesData(last20Payloads.map((item) => item.localCreatedAt));
        }
      }
    };

    fetchLatestPayload();
  }, [focusedDevice, getLatestPayload, getDeviceLast20Payloads]);

  const statusColor = getDeviceStatusColor(focusedDevice?.status);

  return (
    <div className="row-start-4 col-span-3 row-span-4 col-start-3 col bg-white/20  rounded-2xl p-6">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-bold text-2xl text-white">Live Readings</h3>

        <span
          className="text-white p-2 rounded-lg font-md"
          style={{ backgroundColor: statusColor }}
        >
          {focusedDevice?.status?.toUpperCase()}
        </span>
      </div>

      {/* charts readings container */}

      {loading && (
        <Skeleton
          sx={{ bgcolor: "#232f41a2" }}
          variant="rounded"
          width={"50%"}
        />
      )}
      {!loading && (
        <div className="max-h-[70%] w-full flex flex-row gap-8 h-full">
          {/* voltage chart */}
          <div className="flex-1 mt-4">
            <div className="flex flex-col justify-between mb-6">
              <h3 className="font-semibold text-lg text-white/50">Voltage</h3>

              <h3 className="font-semibold text-3xl text-white">
                ~ {voltageReadings}v
              </h3>
            </div>

            <LineChart
              xAxis={[
                {
                  data: seriesData,
                  scaleType: "point", // Use 'point' for strings or 'time' for Date objects
                  disableLine: true,
                  disableTicks: true,
                },
              ]}
              series={[
                {
                  showMark: false,
                  data: voltageData, // Your Number array goes here
                  color: "#359eff",
                },
              ]}
              grid={{ horizontal: false, vertical: false }}
              margin={{ left: -40, right: 0, top: 0, bottom: 0 }}
              sx={{
                // Target the main line
                ".MuiLineElement-root": {
                  strokeWidth: 3, // Default is usually 2. Increase this number for a thicker line.
                },
                // Target the area fill (if you are using area: true)
                ".MuiAreaElement-root": {
                  fillOpacity: 0.3, // Optional: Makes the color under the line lighter
                },
                // Hiding the axis stuff (from previous step)
                ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                  display: "none",
                },
                ".MuiChartsAxis-left": { display: "none" },
                ".MuiChartsAxis-line": { display: "none" },
                "& text": {
                  fill: "#ffffff !important",
                },

                // 2. Your existing styles for lines
              }}
            />
          </div>

          {/* current chart */}
          <div className="flex-1 mt-4">
            <div className="flex flex-col justify-between mb-6">
              <h3 className="font-semibold text-lg text-white/50">Current</h3>

              <h3 className="font-semibold text-3xl text-white">
                ~ {currentReadings}A
              </h3>
            </div>

            <LineChart
              xAxis={[
                {
                  data: seriesData,
                  scaleType: "point", // Use 'point' for strings or 'time' for Date objects
                  disableLine: true,
                  disableTicks: true,
                },
              ]}
              series={[
                {
                  showMark: false,
                  data: currentData, // Your Number array goes here
                  color: "#359eff",
                },
              ]}
              grid={{ horizontal: false, vertical: false }}
              margin={{ left: -40, right: 20, top: 0, bottom: 0 }}
              sx={{
                // Target the main line
                ".MuiLineElement-root": {
                  strokeWidth: 3, // Default is usually 2. Increase this number for a thicker line.
                },
                // Target the area fill (if you are using area: true)
                ".MuiAreaElement-root": {
                  fillOpacity: 0.3, // Optional: Makes the color under the line lighter
                },
                // Hiding the axis stuff (from previous step)
                ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                  display: "none",
                },
                ".MuiChartsAxis-left": { display: "none" },
                ".MuiChartsAxis-line": { display: "none" },
                "& text": {
                  fill: "#ffffff !important",
                },

                // 2. Your existing styles for lines
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
