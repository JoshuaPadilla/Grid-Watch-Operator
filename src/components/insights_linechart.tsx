import React, { useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePayloadStore } from "../store/usePayloadStore";
import { useInsightsStore } from "../store/useInsightsStore";
import { HistoryFilter } from "./history_filter";
import { useDeviceStore } from "../store/useDeviceStore";

export const InsightsLineChart = () => {
  const { getOutagesFrequency, outagesFrequency } = useInsightsStore();

  useEffect(() => {
    getOutagesFrequency("all");
  }, [getOutagesFrequency]);

  return (
    <div className=" flex flex-col col-span-4 row-span-1 bg-white/20 rounded-lg p-6">
      {/* Header container */}
      <div className="flex flex-row  justify-between flex-1 mb-4">
        <div>
          <h3 className="text-white font-bold text-2xl mb-2">
            Outages Recorded
          </h3>

          <p className="font-medium text-red-400 text-xl">+ 4.9%</p>
        </div>
      </div>

      {/* chart container */}
      <div className="pb-4 ">
        <LineChart
          style={{
            width: "100%",
            maxWidth: "100%",
            maxHeight: "300px",
            aspectRatio: 1.618,
            left: -40,
          }}
          responsive
          data={outagesFrequency}
        >
          <YAxis
            dataKey="count"
            domain={[0, "auto"]} // Start from 0, auto-adjust max
            tickLine={false}
            axisLine={false}
            padding={{ top: 15, bottom: 15 }}
            style={{ fontSize: "16px", fill: "#FFF" }}
          />
          <XAxis
            dataKey="date" // Use the date/name field from your data
            interval="preserveStartEnd" // Only show labels at the start/end/middle
            tickLine={false} // Hide the tick mark lines
            axisLine={false} // Hide the main axis line
            padding={{ left: 15, right: 15 }}
            style={{ fontSize: "16px", fill: "#999999" }}
          />

          {/* <Line type="monotonx`e" dataKey="count" stroke="#FFF" strokeWidth={2} /> */}

          <Line
            type="monotone" // Creates the smooth curve
            dataKey="count"
            stroke="#359eff" // The main color of the line (adjust as needed)
            strokeWidth={2} // Slightly thicker line
            dot={false} // Remove the data point dots (crucial for this style)
            activeDot={{
              r: 4,
              stroke: "#359eff",
              fill: "#359eff",
              strokeWidth: 2,
            }} // Style for the active dot on hover
          />
        </LineChart>
      </div>
    </div>
  );
};
