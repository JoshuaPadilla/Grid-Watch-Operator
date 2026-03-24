import { Skeleton } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useMemo, useState } from "react";
import { getDeviceStatusColor } from "../app/helpers/getDeviceStatusColor";
import { useDeviceStore } from "../store/useDeviceStore";
import { usePayloadStore } from "../store/usePayloadStore";

interface ReadingPanelProps {
	title: string;
	unit: string;
	currentValue: number;
	chartData: number[];
	seriesData: string[];
	color: string;
}

const ReadingPanel = ({
	title,
	unit,
	currentValue,
	chartData,
	seriesData,
	color,
}: ReadingPanelProps) => {
	const stats = useMemo(() => {
		if (chartData.length === 0) {
			return null;
		}

		const min = Math.min(...chartData);
		const max = Math.max(...chartData);
		const avg =
			chartData.reduce((total, current) => total + current, 0) /
			chartData.length;

		return {
			min,
			max,
			avg,
			samples: chartData.length,
		};
	}, [chartData]);

	return (
		<div className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-200/10 bg-slate-950/35 p-4">
			<div className="mb-4 flex items-start justify-between gap-3">
				<div>
					<p className="text-xs uppercase tracking-[0.16em] text-slate-400">
						Live Metric
					</p>
					<h3 className="text-lg font-semibold text-slate-100">
						{title}
					</h3>
				</div>
				<p className="text-2xl font-semibold text-slate-100">
					{currentValue}
					<span className="ml-1 text-base text-slate-400">
						{unit}
					</span>
				</p>
			</div>

			<div className="min-h-0 flex-1 rounded-xl border border-slate-200/10 bg-slate-900/70 px-2 py-3">
				<LineChart
					height={170}
					xAxis={[
						{
							data: seriesData,
							scaleType: "point",
							disableLine: true,
							disableTicks: true,
						},
					]}
					series={[
						{
							showMark: false,
							data: chartData,
							color,
						},
					]}
					grid={{ horizontal: false, vertical: false }}
					margin={{ left: -40, right: 8, top: 0, bottom: 0 }}
					sx={{
						".MuiLineElement-root": {
							strokeWidth: 3,
						},
						".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
							display: "none",
						},
						".MuiChartsAxis-left": { display: "none" },
						".MuiChartsAxis-line": { display: "none" },
						"& text": {
							fill: "#ffffff !important",
						},
					}}
				/>
			</div>

			{stats && (
				<div className="mt-3 grid grid-cols-3 gap-2 text-xs">
					<div className="rounded-lg border border-slate-200/10 bg-slate-900/80 px-3 py-2">
						<p className="text-slate-400">Min</p>
						<p className="mt-1 font-semibold text-slate-100">
							{stats.min.toFixed(1)}
						</p>
					</div>
					<div className="rounded-lg border border-slate-200/10 bg-slate-900/80 px-3 py-2">
						<p className="text-slate-400">Max</p>
						<p className="mt-1 font-semibold text-slate-100">
							{stats.max.toFixed(1)}
						</p>
					</div>
					<div className="rounded-lg border border-slate-200/10 bg-slate-900/80 px-3 py-2">
						<p className="text-slate-400">Avg</p>
						<p className="mt-1 font-semibold text-slate-100">
							{stats.avg.toFixed(1)}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export const DeviceReportLiveReadingsContainer = () => {
	const [voltageReadings, setVoltageReadings] = useState(0);
	const [currentReadings, setCurrentReadings] = useState(0);
	const [currentData, setCurrentData] = useState<number[]>([]);
	const [voltageData, setVoltageData] = useState<number[]>([]);
	const [seriesData, setSeriesData] = useState<string[]>([]);

	const { getDeviceLast20Payloads, getLatestPayload, loading } =
		usePayloadStore();
	const { focusedDevice } = useDeviceStore();

	useEffect(() => {
		const fetchLatestPayload = async () => {
			if (focusedDevice) {
				const last20Payloads = await getDeviceLast20Payloads(
					focusedDevice.deviceId,
				);

				if (last20Payloads) {
					setVoltageData(last20Payloads.map((item) => item.voltage));
					setCurrentData(last20Payloads.map((item) => item.current));
				}

				const latestPayload = await getLatestPayload(
					focusedDevice.deviceId,
				);

				if (latestPayload) {
					setCurrentReadings(latestPayload.current);
					setVoltageReadings(latestPayload.voltage);
					setSeriesData(
						last20Payloads.map((item) => item.localCreatedAt),
					);
				}
			}
		};

		fetchLatestPayload();
	}, [focusedDevice, getLatestPayload, getDeviceLast20Payloads]);

	const statusColor = getDeviceStatusColor(focusedDevice?.status);

	return (
		<section className="flex h-full min-h-0 flex-col rounded-3xl border border-slate-200/10 bg-slate-900/75 p-4 shadow-xl shadow-black/20">
			<div className="mb-4 flex items-start justify-between gap-3">
				<div>
					<p className="text-xs uppercase tracking-[0.18em] text-slate-400">
						Live Telemetry
					</p>
					<h3 className="text-xl font-semibold text-white">
						Live Readings
					</h3>
				</div>

				<span
					className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
					style={{ backgroundColor: statusColor }}
				>
					{focusedDevice?.status?.toUpperCase()}
				</span>
			</div>

			{loading && (
				<Skeleton
					sx={{ bgcolor: "#232f41a2" }}
					variant="rounded"
					className="min-h-72"
				/>
			)}
			{!loading && (
				<div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
					<ReadingPanel
						title="Voltage"
						unit="V"
						currentValue={voltageReadings}
						chartData={voltageData}
						seriesData={seriesData}
						color="#38bdf8"
					/>
					<ReadingPanel
						title="Current"
						unit="A"
						currentValue={currentReadings}
						chartData={currentData}
						seriesData={seriesData}
						color="#34d399"
					/>
				</div>
			)}
		</section>
	);
};
