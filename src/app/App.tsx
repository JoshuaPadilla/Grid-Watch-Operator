import { useState } from "react";
import AddDevicePopup from "../components/add_device_popup";
import DeviceList from "../components/page_components/device_list";
import Header from "../components/page_components/header";
import MapComponent from "../components/page_components/map-component";

function App() {
  const [showAddDevice, setShowAddDevice] = useState(false);

  return (
    <>
      <Header />

      <div className="grid grid-cols-9 grid-rows-6 w-full h-screen bg-(--background) gap-2 p-8">
        <div className="col-span-6 row-span-3 p-2 bg-(--primary)/20">
          <MapComponent />;
        </div>

        <div className="row-span-3 col-span-3">
          <DeviceList showAddDevice={setShowAddDevice} />
        </div>

        {/* Device Info */}
        <div className="col-span-full row-span-3 bg-(--card_bg)"></div>
      </div>

      <AddDevicePopup show={showAddDevice} hideAddDevice={setShowAddDevice} />
    </>
  );
}

export default App;
