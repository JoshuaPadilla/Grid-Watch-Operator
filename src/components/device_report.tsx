import { PieChart } from "@mui/x-charts";
import React, { useEffect } from "react";
import { DeviceReportMap } from "./device_report_map";
import { DeviceReportOutagePercentage } from "./device_report_outage_percentage";
import { DeviceReportDetails } from "./device_report_details";
import { DeviceReportCardContainer } from "./device_report_card_container";
import { DeviceReportLiveReadingsContainer } from "./device_report_live_readings_container";
import { useNavStore } from "../store/useNavStore";
import socket from "../lib/socket";

const data = [
  { label: "Group C", value: 20, color: "#bedbff" },
  { label: "Group A", value: 80, color: "#51a2ff" },
];

export const DeviceReport = () => {
  const { setShowDeviceReport } = useNavStore();

  const handleBack = () => {
    setShowDeviceReport(false);
  };

  return (
    <div className="flex flex-col h-full gap-4 p-4 rounded-lg relative">
      <button
        className="absolute px-6 py-2 bg-(--primary) z-9999 left-6 top-6 rounded-lg text-white text-md font-semibold"
        onClick={handleBack}
      >
        Back
      </button>
      <div className="w-full h-[calc(100vh-24px)] grid grid-cols-5 grid-rows-7 gap-4 overflow-hidden ">
        <DeviceReportMap />
        <DeviceReportOutagePercentage />

        <div className="row-start-4 row-span-4 col-span-2 flex flex-col gap-4 ">
          <DeviceReportDetails />
          <DeviceReportCardContainer />
        </div>

        <DeviceReportLiveReadingsContainer />
      </div>
    </div>
  );
};
