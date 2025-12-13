import { useState } from "react";
import MapComponent from "./map-component";
import DeviceList from "./device_list";
import { useDeviceStore } from "../../store/useDeviceStore";
import DeviceInfo from "./device_info";
import AddDevicePopup from "../add_device_popup";
import { useNavStore } from "../../store/useNavStore";
import { DeviceReport } from "../device_report";

const Dashboard = () => {
  const [showAddDevice, setShowAddDevice] = useState(false);

  const { focusedDevice } = useDeviceStore();

  const { showDeviceReport } = useNavStore();

  return (
    <>
      {showDeviceReport ? (
        <DeviceReport />
      ) : (
        <div className="grid grid-cols-9 grid-rows-6 w-full h-screen bg-(--background) gap-2 p-8">
          <div
            className={`col-span-6 ${
              focusedDevice ? "row-span-3" : "row-span-6"
            } p-2 bg-(--primary)/20`}
          >
            <MapComponent />;
          </div>

          <div className="row-span-3 col-span-3">
            <DeviceList showAddDevice={setShowAddDevice} />
          </div>

          {/* Device Info */}
          {focusedDevice && (
            <div className={`col-span-full row-span-3`}>
              <DeviceInfo />
            </div>
          )}

          <AddDevicePopup
            show={showAddDevice}
            hideAddDevice={setShowAddDevice}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
