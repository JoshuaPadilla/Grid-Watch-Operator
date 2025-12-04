import { useEffect, useState } from "react";
import { useHistoryStore } from "../../store/useHistory";
import { HistoryCard } from "../history_card";
import { HistoryMap } from "../history_map";
import { HistoryDetails } from "../history_details";
import { useDeviceStore } from "../../store/useDeviceStore";
import type { Device } from "../../interfaces/device.interface";

const History = () => {
  const { getAllHistory, history, selectedHistory } = useHistoryStore();

  const [device, setDevice] = useState<Device | undefined>(undefined);

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

  return (
    <>
      <div className="w-full h-screen grid grid-cols-5 p-4 gap-4">
        <div className="col-span-2 bg-(--card_bg) p-4 ">
          <div className="flex flex-col gap-2">
            {history.length > 0 &&
              history.map((history) => {
                return <HistoryCard history={history} />;
              })}
          </div>
        </div>
        <div className="flex flex-row col-span-3 bg-(--card_bg) p-4 relative items-center justify-center">
          <HistoryMap device={device} />

          {selectedHistory && (
            <HistoryDetails device={device} history={selectedHistory} />
          )}
        </div>
      </div>
    </>
  );
};

export default History;
