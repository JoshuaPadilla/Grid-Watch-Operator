import React, { useState } from "react";
import { Icons } from "../constants/icons.constant";
import { useHistoryStore } from "../store/useHistory";

interface Props {
  query: string;
  onChangeQuery: (text: string) => void;
}

export const SearchBar = ({ query, onChangeQuery }: Props) => {
  return (
    <div className="bg-white/70 p-4 rounded-md my-4 flex-1">
      <div className="flex flex-row gap-2 items-center">
        <img src={Icons.search} className="size-5" />
        <input
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          placeholder="Search..."
          className="grow border-none outline-none bg-transparent font-medium textlg px-4"
        />
      </div>
    </div>
  );
};
