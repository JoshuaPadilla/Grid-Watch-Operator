import { PieChart } from "@mui/x-charts";
import React from "react";

const data = [
  { label: "Group C", value: 20, color: "#bedbff" },
  { label: "Group A", value: 80, color: "#51a2ff" },
];

export const DeviceReportOutagePercentage = () => {
  return (
    <div className="col-start-4 col-span-2 row-span-3 bg-white/20 rounded-2xl p-6">
      <h3 className="font-semibold text-lg text-white">
        Device Outage Prediction
      </h3>

      <div className="w-full h-full flex flex-row gap-4">
        <div className="w-[50%] h-[90%] relative flex justify-center items-center">
          {/* The h3 is centered both horizontally and vertically here */}
          <h3 className="text-white font-bold text-4xl mb-2 absolute">20%</h3>
          <PieChart
            slotProps={{
              legend: { hidden: true } as any,
            }}
            sx={{
              "& .MuiPieArc-root": {
                stroke: "none", // Removes the border
              },
            }}
            series={[
              {
                innerRadius: "60%", // Percentages work for responsive resizing
                outerRadius: "100%",
                data: data.map((item, index) => ({
                  id: index,
                  value: item.value,
                  label: item.label,
                  color: item.color,
                })),
                cornerRadius: 5,
                startAngle: -180,
                endAngle: 180,
                paddingAngle: 4,
              },
            ]}
          />
        </div>

        <div className=" max-w-[50%]">
          {/* Legends */}
          <div className="mb-8">
            <div className="flex gap-2 items-center">
              <div className="size-3 bg-blue-200 rounded-full" />
              <p className="font-semibold text-md text-white">Outage Risk</p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="size-3 bg-blue-400 rounded-full" />
              <p className="font-semibold text-md text-white">
                Stable Percentage
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="p-4 bg-sky-300/30 rounded-xl">
            <p className="font-medium text-black text-justify">
              Outage percentage is low only at 20% device is stable and expect
              no power little to no power outage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
