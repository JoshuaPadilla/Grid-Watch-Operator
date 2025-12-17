import React, { useState } from "react";
import { useHistoryStore } from "../store/useHistory";

interface Props {
  onChange: (query: string) => void;
  position?: string;
}

export const ChartFilter = ({ onChange, position }: Props) => {
  const handleChangeFilter = (query: string) => {
    onChange(query);
  };

  return (
    <select
      id="fruits"
      name="favorite_fruit"
      className={`px-2 py-1 rounded-md bg-white/80 backdrop-blur-2xl outline-none font-medium text-md h-fit absolute ${
        position ? position : "right-4 top-4 z-9999"
      }`}
      onChange={(e) => handleChangeFilter(e.target.value)}
    >
      <option value="week" selected>
        This Week
      </option>
      <option value="month">This Month</option>
      <option value="all">All</option>
    </select>
  );
};
