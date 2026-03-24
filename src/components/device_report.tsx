import { useDeviceStore } from "../store/useDeviceStore";
import { useInsightsStore } from "../store/useInsightsStore";
import { useNavStore } from "../store/useNavStore";
import { ChartFilter } from "./chart_filter";
import { DeviceReportCardContainer } from "./device_report_card_container";
import { DeviceReportDetails } from "./device_report_details";
import { DeviceReportLiveReadingsContainer } from "./device_report_live_readings_container";
import { DeviceReportMap } from "./device_report_map";
import { DeviceReportOutagePercentage } from "./device_report_outage_percentage";

export const DeviceReport = () => {
	const { setShowDeviceReport } = useNavStore();
	const { getBarChartData, loading } = useInsightsStore();
	const { focusedDevice } = useDeviceStore();

	const handleBack = () => {
		setShowDeviceReport(false);
	};

	const handleChangeChartFilter = (query: string) => {
		getBarChartData(focusedDevice?.deviceId || "", query);
	};

	return (
		<div className="relative min-h-dvh w-full overflow-x-hidden overflow-y-auto bg-(--background) p-4 md:p-6">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-16 left-8 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
				<div className="absolute bottom-12 right-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
			</div>

			<div className="relative z-10 flex flex-col gap-4">
				<section className="rounded-3xl border border-slate-200/10 bg-slate-900/45 p-4 backdrop-blur-sm">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div>
							<p className="text-xs uppercase tracking-[0.22em] text-slate-300/75">
								GridWatch Analytics
							</p>
							<h1 className="mt-1 text-2xl font-semibold text-slate-100 md:text-3xl">
								Device Reliability Report
							</h1>
							<p className="mt-1 text-sm text-slate-300/80">
								{focusedDevice?.deviceId
									? `Focused on ${focusedDevice.deviceId}`
									: "No focused device selected"}
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-3">
							{loading && (
								<span className="rounded-full border border-sky-300/30 bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-200">
									Refreshing
								</span>
							)}
							<ChartFilter
								onChange={handleChangeChartFilter}
								position="static z-auto"
							/>
							<button
								className="rounded-xl border border-sky-300/35 bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/35"
								onClick={handleBack}
							>
								Back To Dashboard
							</button>
						</div>
					</div>
				</section>

				<div className="flex flex-col gap-4 xl:hidden">
					<div className="min-h-96">
						<DeviceReportMap />
					</div>
					<div className="min-h-96 ">
						<DeviceReportOutagePercentage />
					</div>
					<div className="grid gap-4">
						<div className="min-h-96">
							<DeviceReportDetails />
						</div>
						<div className="min-h-72">
							<DeviceReportCardContainer />
						</div>
					</div>
					<div className="min-h-120">
						<DeviceReportLiveReadingsContainer />
					</div>
				</div>

				<section className="hidden rounded-3xl border border-slate-100/10 bg-slate-900/35 p-2 shadow-2xl shadow-black/20 xl:block">
					<div className="grid h-[calc(100dvh-13.5rem)] min-h-192 grid-cols-12 grid-rows-[1.05fr_0.9fr_0.65fr] gap-4">
						<div className="col-span-7 row-span-1 min-h-0">
							<DeviceReportMap />
						</div>
						<div className="col-span-5 row-span-1 min-h-88">
							<DeviceReportOutagePercentage />
						</div>

						<div className="col-span-4 row-start-2 min-h-0">
							<DeviceReportDetails />
						</div>

						<div className="col-span-4 row-start-3 min-h-0 overflow-hidden">
							<DeviceReportCardContainer />
						</div>

						<div className="col-span-8 row-start-2 row-span-2 min-h-0">
							<DeviceReportLiveReadingsContainer />
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};
