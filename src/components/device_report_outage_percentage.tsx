import { PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import socket from "../lib/socket";

export const DeviceReportOutagePercentage = () => {
  const [predictionData, setPredictionData] = useState([
    { label: "Risk Score", value: 0, color: "#bedbff" },
    { label: "Stable", value: 100, color: "#51a2ff" },
  ]);
  const [riskPercentage, setRiskPercentage] = useState(0);

  useEffect(() => {
    // 2. Define the handler function
    const handlePrediction = (payload: any) => {
      // payload = { deviceId: 'sample2', riskScore: 0.12 }

      if (payload && typeof payload.riskScore === "number") {
        // Convert 0.12 -> 12
        const riskPercentage = Math.floor(payload.riskScore * 100);

        // Calculate remainder: 100 - 12 = 88
        const remainder = 100 - riskPercentage;
        setRiskPercentage(riskPercentage);
        // 3. Update the state (React will re-render the chart automatically)
        setPredictionData([
          { label: "Risk Score", value: riskPercentage, color: "#bedbff" },
          { label: "Stable", value: remainder, color: "#51a2ff" },
        ]);
      }
    };

    // Listen for the event
    socket.on("prediction", handlePrediction);

    // 4. CLEANUP: Important to prevent memory leaks!
    return () => {
      socket.off("prediction", handlePrediction);
    };
  }, []);

  return (
    <div className="col-start-4 col-span-2 row-span-3 bg-white/20 rounded-2xl p-6 relative">
      <h3 className="font-bold text-xl text-white mb-6 text-center">
        Device Outage Prediction
      </h3>

      {/* body */}
      <div className="w-full h-full flex flex-row gap-4 ">
        {/* Pie Chart */}
        <div className="w-[60%] h-[80%] relative flex justify-center items-center">
          {/* The h3 is centered both horizontally and vertically here */}
          <h3 className="text-white font-bold text-4xl mb-2 absolute">
            {riskPercentage}%
          </h3>
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
                data: predictionData.map((item, index) => ({
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

        {/* Chart Details */}
        <div className=" max-w-[50%] flex flex-col justify-start items-start">
          {/* Legends */}
          <div className="mb-6 flex flex-row gap-3 items-center justify-center">
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
          <div className="p-4 bg-sky-300/30 rounded-xl h-[60%]">
            <p className="font-medium text-white text-justify">
              Outage percentage is low only at {riskPercentage}% device is
              stable and expect no power little to no power outage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
