import React, { useState } from "react";
import MapComponent from "./map-component";
import DeviceList from "./device_list";
import { useDeviceStore } from "../../store/useDeviceStore";
import DeviceInfo from "./device_info";

const Dashboard = () => {
  const [showAddDevice, setShowAddDevice] = useState(false);

  const { focusedDevice } = useDeviceStore();

  return (
    <div className="grid grid-cols-9 grid-rows-6 w-full h-screen bg-(--background) gap-2 p-8">
      <div className="col-span-6 row-span-3 p-2 bg-(--primary)/20">
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
    </div>
  );
};

export default Dashboard;
