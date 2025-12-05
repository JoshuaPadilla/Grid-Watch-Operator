import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usePayloadStore } from "../store/usePayloadStore";

export const InsightsLineChart = () => {
  const {
    deviceLast20Payloads,
    loading,
    updateDeviceLast20Payloads,
    getLatestPayload,
  } = usePayloadStore();

  return (
    <div className="col-span-4 row-span-1 bg-white/20 rounded-lg">
      <AreaChart
        style={{
          width: deviceLast20Payloads.length * 40,
          height: 180,
        }}
        responsive
        data={deviceLast20Payloads}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(56, 99, 160, 0.635)"
        />
        <YAxis width="auto" dataKey="voltage" />
        <XAxis
          dataKey="localCreatedAt"
          width="auto"
          tickLine={{ stroke: "#FFF" }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="voltage"
          stroke="#359eff"
          fill="#359eff"
        />
      </AreaChart>
    </div>
  );
};
