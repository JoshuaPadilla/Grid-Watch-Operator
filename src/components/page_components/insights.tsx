import React, { useEffect, useRef } from "react";
import { InsightsNumbers } from "../insights_numbers";
import { InsightsChartsContainer } from "../insights_charts_container";
import { useNavStore } from "../../store/useNavStore";
import { NAVIGATION } from "../../types/nav.type";
import { DeviceReportMap } from "../device_report_map";
import { DeviceReportOutagePercentage } from "../device_report_outage_percentage";
import { DeviceReportDetails } from "../device_report_details";

export const Insights = () => {
  const deviceReportRef = useRef<HTMLDivElement>(null);

  const { activeNav, fromNav } = useNavStore();

  useEffect(() => {
    // Check if the current nav is INSIGHTS (adjust enum name if needed)
    // and if the ref exists.
    if (
      activeNav === NAVIGATION.INSIGHTS &&
      deviceReportRef.current &&
      !fromNav
    ) {
      deviceReportRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeNav, fromNav]);

  return (
    <div className="overflow-y-scroll hide-scrollbar p-8">
      <div className="flex flex-col h-fit gap-4 mb-4">
        <InsightsNumbers />
        <InsightsChartsContainer />
      </div>

      {/* this is the div I want to scroll on */}
      <div
        className="flex flex-col h-full gap-4 p-4 rounded-lg relative"
        ref={deviceReportRef}
      >
        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-4">
          <DeviceReportMap />
          <DeviceReportOutagePercentage />
          <DeviceReportDetails />
        </div>
      </div>
    </div>
  );
};
