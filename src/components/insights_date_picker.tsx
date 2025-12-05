import moment from "moment";
import React, { useState } from "react";

export const InsightsDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  return (
    <div className="bg-white/20 p-2 rounded-lg">
      <input
        className="font-semibold text-md text-white"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>
  );
};
