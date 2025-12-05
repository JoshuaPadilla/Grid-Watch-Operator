import React from "react";
import { InsightsLineChart } from "./insights_linechart";
import InsightsPercentage from "./insights_percentage";

export const InsightsChartsContainer = () => {
  return (
    <div className="grid grid-cols-6 flex-1 gap-4">
      <InsightsLineChart />

      <div className="flex flex-col col-span-2 gap-4">
        <InsightsPercentage />
      </div>
    </div>
  );
};
