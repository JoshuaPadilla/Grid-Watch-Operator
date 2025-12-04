import React from "react";
import { Icons } from "../constants/icons.constant";
import type { History } from "../interfaces/history.interface";

interface Props {
  history: History[];
}
export const HistoryInsightss = ({ history }: Props) => {
  const totalOutages = history.filter(
    (history) => history.status === "outage"
  ).length;
  const totalnotif = history.filter(
    (history) => history.status === "notif"
  ).length;
  const totalRestored = history.filter(
    (history) => history.status === "restored"
  ).length;

  return (
    <div className="w-full mb-4 flex flex-row justify-between gap-4">
      {/* Total Outage */}
      <div className="grow bg-white/20 backdrop-blur-2xl rounded-lg p-4 flex flex-col items-center ">
        <img src={Icons.outage} className="size-15" />

        <div className="p-2 flex flex-col items-center gap-2">
          <h3 className="font-bold text-3xl text-white">{totalOutages}</h3>
          <p className="font-medium text-sm text-white/80">Total Outages</p>
        </div>
      </div>

      {/* Total Notif */}
      <div className="grow bg-white/20 backdrop-blur-2xl rounded-lg p-4 flex flex-col items-center ">
        <img src={Icons.notif} className="size-15" />

        <div className="p-2 flex flex-col items-center gap-2">
          <h3 className="font-bold text-3xl text-white">{totalnotif}</h3>
          <p className="font-medium text-sm text-white/80">Total Information</p>
        </div>
      </div>

      <div className="grow bg-white/20 backdrop-blur-2xl rounded-lg p-4 flex flex-col items-center ">
        <img src={Icons.restored} className="size-15" />

        <div className="p-2 flex flex-col items-center gap-2">
          <h3 className="font-bold text-3xl text-white">{totalRestored}</h3>
          <p className="font-medium text-sm text-white/80">Total Restored</p>
        </div>
      </div>
    </div>
  );
};
