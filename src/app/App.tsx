import { useEffect, useState } from "react";
import AddDevicePopup from "../components/add_device_popup";
import Header from "../components/page_components/header";
import { useDeviceStore } from "../store/useDeviceStore";
import socket from "../lib/socket";
import { useNavStore } from "../store/useNavStore";
import { NAVIGATION } from "../types/nav.type";
import Dashboard from "../components/page_components/dashboard";
import History from "../components/page_components/history";
import { Insights } from "../components/page_components/insights";

function App() {
  const [showAddDevice, setShowAddDevice] = useState(false);
  const { activeNav } = useNavStore();

  const { focusedDevice } = useDeviceStore();

  useEffect(() => {
    if (socket.connected) {
      socket.connect();
    }
  }, []);

  return (
    <>
      <Header />
      {activeNav === NAVIGATION.DASHBOARD && <Dashboard />}
      {activeNav === NAVIGATION.HISTORY && <History />}
      {activeNav === NAVIGATION.INSIGHTS && <Insights />}

      <AddDevicePopup show={showAddDevice} hideAddDevice={setShowAddDevice} />
    </>
  );
}

export default App;
