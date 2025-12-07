import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { InsightsDatePicker } from "./insights_date_picker";
import { InsightsNumbersComponents } from "./insights_numbers_components";
import { Icons } from "../constants/icons.constant";
import { useInsightsStore } from "../store/useInsightsStore";
import { MoonLoader } from "react-spinners";

export const InsightsNumbers = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );

  const { insightsNumbers, getInsightsNumbers, loading } = useInsightsStore();

  useEffect(() => {
    getInsightsNumbers();
  }, [getInsightsNumbers]);

  return (
    <div className="min-h-[40%] flex flex-col gap-4">
      {/* filters */}
      <div className="flex-1 flex flex-row justify-between h-[30%] items-center">
        <InsightsDatePicker />

        <div className="bg-(--card_bg) w-[20%] h-full"></div>
      </div>

      {/* NUmbers */}
      <div className="flex flex-row flex-wrap gap-4 h-[70%]">
        {loading ? (
          <MoonLoader
            size={120}
            color="
        #359eff"
            loading={loading}
          />
        ) : (
          <InsightsNumbersComponents
            icon={Icons.insights_device}
            title="Total Devices"
            value={insightsNumbers?.totalDevices}
          />
        )}
        {loading ? (
          <MoonLoader
            size={120}
            color="
        #359eff"
            loading={loading}
          />
        ) : (
          <InsightsNumbersComponents
            icon={Icons.insights_outage}
            title="Outages Recorded"
            value={insightsNumbers?.outagesReported}
          />
        )}
        {loading ? (
          <MoonLoader
            size={120}
            color="
        #359eff"
            loading={loading}
          />
        ) : (
          <InsightsNumbersComponents
            icon={Icons.insights_stable}
            title="Stable Grids"
            value={insightsNumbers?.stableGrids}
          />
        )}
        {loading ? (
          <MoonLoader
            size={120}
            color="
        #359eff"
            loading={loading}
          />
        ) : (
          <InsightsNumbersComponents
            icon={Icons.insights_restored}
            title="Total Restored"
            value={insightsNumbers?.totalRestored}
          />
        )}
      </div>
    </div>
  );
};
