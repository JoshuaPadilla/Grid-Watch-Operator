import React from "react";
import { DeviceReportCard } from "./device_report_card";

export const DeviceReportCardContainer = () => {
  return (
    <div className=" row-start-6 row-span-2 col-span-2  flex flex-row gap-4 h-full">
      <DeviceReportCard
        percentageValue={20}
        title="Outage Recorded"
        value={20}
        emptyColor="#b9f8cf"
        valueColor="#05df72"
      />
      <DeviceReportCard
        percentageValue={18}
        title="Restored Grids"
        value={18}
        emptyColor="#ffc9c9"
        valueColor="#ff6467"
      />
    </div>
  );
};
