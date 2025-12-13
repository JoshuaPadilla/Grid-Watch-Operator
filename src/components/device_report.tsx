import { PieChart } from "@mui/x-charts";
import React from "react";
import { DeviceReportMap } from "./device_report_map";
import { DeviceReportOutagePercentage } from "./device_report_outage_percentage";
import { DeviceReportDetails } from "./device_report_details";

const data = [
  { label: "Group C", value: 20, color: "#bedbff" },
  { label: "Group A", value: 80, color: "#51a2ff" },
];

export const DeviceReport = () => {
  return (
    <div className="flex flex-col h-full gap-4 p-4 rounded-lg relative">
      <div className="w-full h-screen grid grid-cols-5 grid-rows-7 gap-4">
        <DeviceReportMap />
        <DeviceReportOutagePercentage />
        <DeviceReportDetails />
      </div>
    </div>
  );
};
