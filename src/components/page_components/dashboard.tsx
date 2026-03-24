import { useMemo, useState } from "react";
import { useDeviceStore } from "../../store/useDeviceStore";
import { useNavStore } from "../../store/useNavStore";
import { DEVICE_STATUS } from "../../types/device_status.type";
import AddDevicePopup from "../add_device_popup";
import { DeviceReport } from "../device_report";
import DeviceInfo from "./device_info";
import DeviceList from "./device_list";
import MapComponent from "./map-component";

const Dashboard = () => {
	const [showAddDevice, setShowAddDevice] = useState(false);

	const { focusedDevice, devices } = useDeviceStore();

	const { showDeviceReport } = useNavStore();

	const statusSummary = useMemo(() => {
		const summary = {
			total: devices.length,
			online: 0,
			alert: 0,
			noPower: 0,
		};

		for (const device of devices) {
			if (device.status === DEVICE_STATUS.STABLE) {
				summary.online += 1;
			} else if (device.status === DEVICE_STATUS.NO_POWER) {
				summary.noPower += 1;
			} else {
				summary.alert += 1;
			}
		}

		return summary;
	}, [devices]);

	const dashboardCards = [
		{
			label: "Total Devices",
			value: statusSummary.total,
			accent: "from-sky-400/20 to-sky-700/20",
			textColor: "text-sky-300",
		},
		{
			label: "Online",
			value: statusSummary.online,
			accent: "from-emerald-400/20 to-emerald-700/20",
			textColor: "text-emerald-300",
		},
		{
			label: "Warnings",
			value: statusSummary.alert,
			accent: "from-amber-400/20 to-amber-700/20",
			textColor: "text-amber-300",
		},
		{
			label: "No Power",
			value: statusSummary.noPower,
			accent: "from-rose-400/20 to-rose-700/20",
			textColor: "text-rose-300",
		},
	];

	return (
		<>
			{showDeviceReport ? (
				<DeviceReport />
			) : (
				<div className="relative min-h-dvh w-full overflow-x-hidden overflow-y-auto bg-(--background) p-4 md:p-6">
					<div className="pointer-events-none absolute inset-0">
						<div className="absolute -top-24 left-12 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
						<div className="absolute bottom-12 right-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
					</div>

					<div
						className={`relative z-10 grid h-full gap-4 xl:grid-cols-12 ${
							focusedDevice
								? "xl:grid-rows-[auto_minmax(24rem,1fr)_auto]"
								: "xl:grid-rows-[auto_minmax(0,1fr)]"
						}`}
					>
						<section className="rounded-3xl border border-slate-200/10 bg-slate-900/45 p-4 backdrop-blur-sm xl:col-span-12">
							<div className="mb-4 flex flex-wrap items-end justify-between gap-4">
								<div>
									<p className="text-sm uppercase tracking-[0.22em] text-slate-300/80">
										GridWatch Control Center
									</p>
									<h1 className="text-2xl font-semibold text-slate-100 md:text-3xl">
										Electrical Network Dashboard
									</h1>
								</div>
								<p className="text-sm text-slate-300/80">
									Live telemetry and outage awareness for
									every monitored node.
								</p>
							</div>

							<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
								{dashboardCards.map((card) => (
									<article
										key={card.label}
										className={`rounded-2xl border border-white/10 bg-gradient-to-br ${card.accent} p-4`}
									>
										<p className="text-xs font-medium uppercase tracking-widest text-slate-300/80">
											{card.label}
										</p>
										<p
											className={`mt-2 text-3xl font-semibold ${card.textColor}`}
										>
											{card.value}
										</p>
									</article>
								))}
							</div>
						</section>

						<section className="min-h-[22rem] overflow-hidden rounded-3xl border border-slate-100/10 bg-slate-900/50 p-3 shadow-2xl shadow-black/25 xl:col-span-8 xl:min-h-0">
							<div className="mb-3 flex items-center justify-between px-1">
								<h2 className="text-lg font-semibold text-slate-100">
									Device Coverage Map
								</h2>
								<p className="text-xs text-slate-300/80">
									Real-time marker status
								</p>
							</div>
							<div className="h-[calc(100%-2rem)] overflow-hidden rounded-2xl border border-slate-300/10">
								<MapComponent />
							</div>
						</section>

						<section className="min-h-[22rem] rounded-3xl border border-slate-100/10 bg-slate-900/50 p-2 shadow-2xl shadow-black/25 xl:col-span-4 xl:min-h-0">
							<DeviceList showAddDevice={setShowAddDevice} />
						</section>

						{focusedDevice && (
							<section className="rounded-3xl border border-slate-100/10 bg-slate-900/50 p-2 shadow-2xl shadow-black/25 xl:col-span-12 xl:min-h-[28rem]">
								<DeviceInfo />
							</section>
						)}

						<AddDevicePopup
							show={showAddDevice}
							hideAddDevice={setShowAddDevice}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default Dashboard;
