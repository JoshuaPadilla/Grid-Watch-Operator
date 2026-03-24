import { BarChart } from "@mui/x-charts";
import { useEffect, useMemo } from "react";
import { useDeviceStore } from "../store/useDeviceStore";
import { useInsightsStore } from "../store/useInsightsStore";

const chartSetting = {
	yAxis: [
		{
			tickLabelStyle: {
				fill: "#FFF",
			},
		},
	],
	series: [
		{ dataKey: "outage", label: "Outage", color: "#ff6467" },
		{ dataKey: "restored", label: "restored", color: "#05df72" },
	],
	margin: { left: -15 },
	borderRadius: 5,
};

export const DeviceReportDetails = () => {
	const { getBarChartData, barChartData } = useInsightsStore();
	const { focusedDevice } = useDeviceStore();
	const focusedDeviceId = focusedDevice?.deviceId;

	const totals = useMemo(() => {
		const points = barChartData?.data ?? [];
		const totalWindows = points.length;

		return {
			totalWindows,
			totalOutage: barChartData?.totalOutage ?? 0,
			totalRestored: barChartData?.totalRestored ?? 0,
		};
	}, [barChartData]);

	useEffect(() => {
		const fetchData = async () => {
			getBarChartData(focusedDeviceId || "", "week");
		};

		fetchData();
	}, [focusedDeviceId, getBarChartData]);

	return (
		<section className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200/10 bg-slate-900/70 p-3.5 shadow-xl shadow-black/20">
			<div className="mb-3 flex items-start justify-between gap-3">
				<div>
					<p className="text-xs uppercase tracking-[0.18em] text-slate-400">
						Recovery Trends
					</p>
					<h3 className="text-lg font-semibold text-slate-100">
						Outage vs Restored Grids
					</h3>
				</div>

				<div className="flex flex-wrap gap-2 text-xs">
					<span className="rounded-full border border-rose-300/25 bg-rose-500/15 px-3 py-1 font-semibold text-rose-200">
						Outage {totals.totalOutage}
					</span>
					<span className="rounded-full border border-emerald-300/25 bg-emerald-500/15 px-3 py-1 font-semibold text-emerald-200">
						Restored {totals.totalRestored}
					</span>
				</div>
			</div>

			<div className="mb-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
				<div className="rounded-xl border border-slate-200/10 bg-slate-950/40 px-3 py-2">
					<p className="text-slate-400">Tracked Windows</p>
					<p className="mt-1 font-semibold text-slate-100">
						{totals.totalWindows}
					</p>
				</div>
				<div className="rounded-xl border border-slate-200/10 bg-slate-950/40 px-3 py-2">
					<p className="text-slate-400">Outage Events</p>
					<p className="mt-1 font-semibold text-slate-100">
						{totals.totalOutage}
					</p>
				</div>
				<div className="rounded-xl border border-slate-200/10 bg-slate-950/40 px-3 py-2">
					<p className="text-slate-400">Restored Events</p>
					<p className="mt-1 font-semibold text-slate-100">
						{totals.totalRestored}
					</p>
				</div>
			</div>

			<div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200/10 bg-slate-950/40 px-2 py-2">
				<BarChart
					height={132}
					dataset={barChartData?.data || []}
					xAxis={[
						{
							dataKey: "name",
							tickLabelStyle: {
								fill: "#FFF",
							},
							disableTicks: true,
						},
					]}
					grid={{ horizontal: false, vertical: false }}
					{...chartSetting}
					sx={{
						// Hide X-axis line/ticks
						"& .MuiChartsAxis-line": {
							display: "none",
						},
						"& .MuiChartsAxis-tick": {
							display: "none",
						},
						"& .MuiChartsAxis-root.MuiChartsAxis--left": {
							display: "none",
						},
						// HIDE THE LEGEND ENTIRELY using its root CSS class
						"& .MuiChartsLegend-root": {
							display: "none",
						},
						"& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
							display: "none",
						},
						"& text": {
							fill: "#e2e8f0 !important",
						},
					}}
				/>
			</div>
		</section>
	);
};
