import { colors } from "@mui/material";
import { teal } from "@mui/material/colors";
import { BarChart } from "@mui/x-charts";
import React, { useEffect } from "react";
import { useInsightsStore } from "../store/useInsightsStore";

const chartSetting = {
  yAxis: [
    {
      label: "Count",
      width: 60,
      tickLabelStyle: {
        fill: "#FFF",
      },
    },
  ],
  series: [
    { dataKey: "outage", label: "Outage", color: "#ff6467" },
    { dataKey: "restored", label: "restored", color: "#05df72" },
  ],
  margin: { left: 0 },
  borderRadius: 5,
};

export const DeviceReportDetails = () => {
  const { getBarChartData, barChartData } = useInsightsStore();

  useEffect(() => {
    const fetchData = async () => {
      getBarChartData("week");
    };

    fetchData();
  }, [getBarChartData]);

  return (
    <div className="row-span-2 col-span-2 bg-white/20 rounded-xl">
      <BarChart
        dataset={barChartData}
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
          "& .MuiChartsAxis-line": {
            display: "none",
          },
          "& .MuiChartsAxis-tick": {
            display: "none",
          },
        }}
      />
    </div>
  );
};
