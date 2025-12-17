import { LinearProgress, linearProgressClasses } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  value: number;
  percentageValue: number;
  valueColor: string;
  emptyColor: string;
}

export const DeviceReportCard = ({
  title,
  emptyColor,
  value,
  percentageValue,
  valueColor,
}: Props) => {
  return (
    <div className="p-4 bg-white/20 rounded-2xl flex-1 ">
      <div className="flex flex-col items-center justify-center gap-6 mb-6">
        <p className="font-semibold text-white/50 text-xl">{title}</p>

        <h3 className="font-bold text-white text-4xl">{value}</h3>
      </div>

      <LinearProgress
        variant="determinate"
        value={percentageValue}
        sx={{
          height: 20, // Thicker bar
          borderRadius: 2, // Rounded corners
          [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: emptyColor, // Track color (grey)
          },
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 3, // Rounded corners for the filled part
            backgroundColor: valueColor, // The Cyan/Blue color
          },
        }}
      />
    </div>
  );
};
