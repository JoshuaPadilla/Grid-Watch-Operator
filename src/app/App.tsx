import { useEffect } from "react";
import Header from "../components/page_components/header";
import socket from "../lib/socket";
import { useNavStore } from "../store/useNavStore";
import { NAVIGATION } from "../types/nav.type";
import Dashboard from "../components/page_components/dashboard";
import { Insights } from "../components/page_components/insights";
import HistoryComponent from "../components/page_components/history";
import { useDeviceStore } from "../store/useDeviceStore";

function App() {
  const { activeNav, showDeviceReport } = useNavStore();

  const { changeDeviceStatus, updateFocusedDevice } = useDeviceStore();
  useEffect(() => {
    socket.on("changeDeviceStatus", (data) => {
      changeDeviceStatus(data.deviceId, data.status);
      updateFocusedDevice(data.status);
    });
  }, [changeDeviceStatus, updateFocusedDevice]);

  useEffect(() => {
    if (socket.connected) {
      socket.connect();
    }
  }, []);

  return (
    <>
      {!showDeviceReport && <Header />}
      {activeNav === NAVIGATION.DASHBOARD && <Dashboard />}
      {activeNav === NAVIGATION.HISTORY && <HistoryComponent />}
      {activeNav === NAVIGATION.INSIGHTS && <Insights />}
    </>
  );
}

export default App;
