import React from "react";
import type { History } from "../interfaces/history.interface";
import { useHistoryStore } from "../store/useHistory";
import { getHistoryIcon } from "../app/helpers/getHistoryIcon";
import { getHistoryColor } from "../app/helpers/getHistoryColor";
import { textShortener } from "../app/helpers/textShortener";

interface Props {
  history: History;
}

export const HistoryCard = ({ history }: Props) => {
  const { setSelectedHistory, selectedHistory } = useHistoryStore();

  const focused = selectedHistory?._id === history._id;
  const icon = getHistoryIcon(history.status);
  const color = getHistoryColor(history.status);

  return (
    <div>
      <button
        onClick={() => setSelectedHistory(history)}
        className={`${
          focused ? "bg-white/80" : "bg-white/50"
        } p-2  rounded-lg flex flex-row w-full gap-4`}
        style={{ borderLeftWidth: 5, borderLeftColor: color }}
      >
        <div className="p-2 bg-slate-50/80 rounded-xl">
          <img src={icon} className="size-8" />
        </div>

        <div className="flex flex-col items-start">
          <h3 className="font-semibold text-lg">{history.title}</h3>
          <p>{textShortener(history?.body, 40)}</p>
        </div>
      </button>
    </div>
  );
};
