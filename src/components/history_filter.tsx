import React, { useState } from "react";
import { useHistoryStore } from "../store/useHistory";

export const HistoryFilter = () => {
  const { getAllHistory } = useHistoryStore();

  const handleChangeFilter = (query: string) => {
    getAllHistory(`filter=${query}`);
  };

  return (
    <select
      id="fruits"
      name="favorite_fruit"
      className="px-2 py-1 rounded-md bg-white/80 backdrop-blur-2xl outline-none font-medium text-md "
      onChange={(e) => handleChangeFilter(e.target.value)}
    >
      <option value="Today">Today</option>
      <option value="This Week" selected>
        This Week
      </option>
      <option value="This Month">This Month</option>
    </select>
  );
};
