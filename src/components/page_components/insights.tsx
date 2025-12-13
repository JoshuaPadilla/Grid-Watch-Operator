import React, { useEffect, useRef } from "react";
import { InsightsNumbers } from "../insights_numbers";
import { InsightsChartsContainer } from "../insights_charts_container";
import { useNavStore } from "../../store/useNavStore";
import { NAVIGATION } from "../../types/nav.type";
import { DeviceReportMap } from "../device_report_map";
import { DeviceReportOutagePercentage } from "../device_report_outage_percentage";
import { DeviceReportDetails } from "../device_report_details";

export const Insights = () => {
  return (
    <div className="overflow-y-scroll hide-scrollbar p-8">
      <div className="flex flex-col h-fit gap-4 mb-4">
        <InsightsNumbers />
        <InsightsChartsContainer />
      </div>
    </div>
  );
};
