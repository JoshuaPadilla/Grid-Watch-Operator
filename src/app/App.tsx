import { useEffect } from "react";
import Dashboard from "../components/page_components/dashboard";
import Header from "../components/page_components/header";
import HistoryComponent from "../components/page_components/history";
import { Insights } from "../components/page_components/insights";
import socket from "../lib/socket";
import { useDeviceStore } from "../store/useDeviceStore";
import { useNavStore } from "../store/useNavStore";
import type { DeviceStatusType } from "../types/device_status.type";
import { NAVIGATION } from "../types/nav.type";

function App() {
	const { activeNav, showDeviceReport } = useNavStore();

	const { changeDeviceStatus, updateFocusedDevice } = useDeviceStore();

	useEffect(() => {
		const handleChangeDeviceStatus = (data: {
			deviceId: string;
			status: DeviceStatusType;
		}) => {
			changeDeviceStatus(data.deviceId, data.status);
			updateFocusedDevice(data.status);
		};

		socket.on("changeDeviceStatus", handleChangeDeviceStatus);

		return () => {
			socket.off("changeDeviceStatus", handleChangeDeviceStatus);
		};
	}, [changeDeviceStatus, updateFocusedDevice]);

	useEffect(() => {
		if (!socket.connected) {
			socket.connect();
		}

		const logAnyEvent = (eventName: string, ...args: unknown[]) => {
			if (
				eventName === "connect" ||
				eventName === "disconnect" ||
				eventName === "connect_error"
			) {
				return;
			}

			console.log("[socket:onAny]", eventName, args[0]);
		};

		socket.onAny(logAnyEvent);

		return () => {
			socket.offAny(logAnyEvent);

			if (socket.connected) {
				socket.disconnect();
			}
		};
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
