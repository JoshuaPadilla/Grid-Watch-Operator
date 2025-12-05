import React from "react";
import { InsightsNumbers } from "../insights_numbers";
import { InsightsChartsContainer } from "../insights_charts_container";

export const Insights = () => {
  return (
    <div className="overflow-y-scroll hide-scrollbar">
      <div className="flex flex-col h-screen p-8 gap-4">
        <InsightsNumbers />
        <InsightsChartsContainer />
      </div>
      <div className="flex flex-col h-screen p-4 gap-4"></div>
    </div>
  );
};
