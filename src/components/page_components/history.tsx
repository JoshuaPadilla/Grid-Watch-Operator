import { useEffect, useState } from "react";
import { useHistoryStore } from "../../store/useHistory";
import { HistoryCard } from "../history_card";
import { HistoryMap } from "../history_map";
import { HistoryDetails } from "../history_details";
import { useDeviceStore } from "../../store/useDeviceStore";
import type { Device } from "../../interfaces/device.interface";
import type { History } from "../../interfaces/history.interface";
import { SearchBar } from "../search_bar";
import { HistoryFilter } from "../history_filter";
import { HistoryInsightss } from "../history_insights";

const HistoryComponent = () => {
  const { getAllHistory, history, selectedHistory } = useHistoryStore();

  const [device, setDevice] = useState<Device | undefined>(undefined);
  const [query, setQuery] = useState("");

  const { getDevice } = useDeviceStore();

  useEffect(() => {
    if (selectedHistory) {
      const fetchDevice = async () => {
        const result = await getDevice(selectedHistory?.deviceId);

        if (result) {
          setDevice(result);
        }
      };

      fetchDevice();
    }
  }, [selectedHistory, getDevice]);

  useEffect(() => {
    getAllHistory();
  }, [getAllHistory]);

  const filteredHistory = query
    ? history.filter((item) => {
        // <-- Change .map() to .filter()
        // Check if the concatenated string contains the query
        return `${item.title} ${item.body} ${item.status}`.includes(query);
      })
    : history;

  return (
    <>
      {/* Histories */}
      <div className="w-full h-screen grid grid-cols-5 p-4 gap-4">
        <div className="col-span-2 bg-(--card_bg) p-4 overflow-y-scroll hide-scrollbar">
          <SearchBar query={query} onChangeQuery={setQuery} />
          {/* titles */}
          <div className="flex flex-row mb-4 justify-between">
            <h3 className="text-white font-semibold">Histories</h3>
            <HistoryFilter />
          </div>

          {/* list */}
          <div className="flex flex-col gap-2 ">
            {filteredHistory.length > 0 &&
              filteredHistory.map((history) => {
                return <HistoryCard history={history} />;
              })}
          </div>
        </div>

        {/* Map */}
        <div className="flex flex-col col-span-3 bg-(--card_bg) p-4 relative items-center justify-center">
          <HistoryInsightss history={filteredHistory} />

          <HistoryMap device={device} />

          {selectedHistory && (
            <HistoryDetails device={device} history={selectedHistory} />
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryComponent;
