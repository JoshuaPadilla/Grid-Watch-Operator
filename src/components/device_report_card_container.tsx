import React from "react";
import { DeviceReportCard } from "./device_report_card";
import { useInsightsStore } from "../store/useInsightsStore";

export const DeviceReportCardContainer = () => {
  const { barChartData } = useInsightsStore();

  return (
    <div className=" row-start-6 row-span-2 col-span-2  flex flex-row gap-4 h-full">
      <DeviceReportCard
        percentageValue={Math.floor(barChartData?.relativeOutageValue || 0)}
        title="Outage Recorded"
        value={barChartData?.totalOutage || 0}
        emptyColor="#b9f8cf"
        valueColor="#05df72"
      />
      <DeviceReportCard
        percentageValue={Math.ceil(barChartData?.relativeRestoredValue || 0)}
        title="Restored Grids"
        value={barChartData?.totalRestored || 0}
        emptyColor="#ffc9c9"
        valueColor="#ff6467"
      />
    </div>
  );
};
