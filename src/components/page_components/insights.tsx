import React from "react";
import { InsightsNumbers } from "../insights_numbers";
import { InsightsChartsContainer } from "../insights_charts_container";
import { PayloadList } from "../payload_list";

export const Insights = () => {
  return (
    <div className="overflow-y-scroll hide-scrollbar p-8">
      <div className="flex flex-col h-fit gap-4 mb-4">
        <InsightsNumbers />
        <InsightsChartsContainer />
      </div>

      <div className="flex flex-col h-screen gap-4 bg-white/20 p-6 rounded-lg">
        <div className="p-2">
          <h1 className="font-bold text-xl text-white">Live Payloads</h1>

          <PayloadList />
        </div>
      </div>
    </div>
  );
};
