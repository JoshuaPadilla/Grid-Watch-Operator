import { colors } from "@mui/material";
import { teal } from "@mui/material/colors";
import { BarChart } from "@mui/x-charts";
import React, { useEffect } from "react";
import { useInsightsStore } from "../store/useInsightsStore";
import { useDeviceStore } from "../store/useDeviceStore";

const chartSetting = {
  yAxis: [
    {
      tickLabelStyle: {
        fill: "#FFF",
      },
    },
  ],
  series: [
    { dataKey: "outage", label: "Outage", color: "#ff6467" },
    { dataKey: "restored", label: "restored", color: "#05df72" },
  ],
  margin: { left: -15 },
  borderRadius: 5,
};

export const DeviceReportDetails = () => {
  const { getBarChartData, barChartData } = useInsightsStore();
  const { focusedDevice } = useDeviceStore();

  useEffect(() => {
    const fetchData = async () => {
      getBarChartData(focusedDevice?.deviceId || "", "week");
    };

    fetchData();
  }, [getBarChartData]);

  return (
    <div className="bg-white/20 rounded-xl max-h[50%]">
      <div className="p-4 flex flex-row ">
        <h3 className="font-semibold text-white text-lg">
          Outage Vs Restored Grids
        </h3>
      </div>

      <div className="flex flex-row px-4 items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <div className="size-3 bg-red-400 rounded-full" />
          <p className="font-normal textsm text-white">Outage</p>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div className="size-3 bg-green-400 rounded-full" />
          <p className="font-normal textsm text-white">Restored</p>
        </div>
      </div>

      <div>
        <BarChart
          dataset={barChartData?.data || []}
          xAxis={[
            {
              dataKey: "name",
              tickLabelStyle: {
                fill: "#FFF",
              },
              disableTicks: true,
            },
          ]}
          grid={{ horizontal: false, vertical: false }}
          {...chartSetting}
          sx={{
            // Hide X-axis line/ticks
            "& .MuiChartsAxis-line": {
              display: "none",
            },
            "& .MuiChartsAxis-tick": {
              display: "none",
            },
            "& .MuiChartsAxis-root.MuiChartsAxis--left": {
              display: "none",
            },
            // HIDE THE LEGEND ENTIRELY using its root CSS class
            "& .MuiChartsLegend-root": {
              display: "none",
            },
          }}
        />
      </div>
    </div>
  );
};
