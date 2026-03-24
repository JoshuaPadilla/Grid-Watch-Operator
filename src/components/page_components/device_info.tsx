import { useEffect, useMemo, useState } from "react";
import { MoonLoader } from "react-spinners";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { formatDate } from "../../app/helpers/date_formatter";
import type { DevicePayload } from "../../interfaces/device_payload.interface";
import socket from "../../lib/socket";
import { useDeviceStore } from "../../store/useDeviceStore";
import { useNavStore } from "../../store/useNavStore";
import { usePayloadStore } from "../../store/usePayloadStore";

interface TelemetryPanelProps {
	title: string;
	unit: string;
	value: number;
	data: DevicePayload[];
	dataKey: "voltage" | "current";
	lineColor: string;
	areaColor: string;
	loading: boolean;
}

const TelemetryPanel = ({
	title,
	unit,
	value,
	data,
	dataKey,
	lineColor,
	areaColor,
	loading,
}: TelemetryPanelProps) => {
	const stats = useMemo(() => {
		if (data.length === 0) {
			return null;
		}

		const values = data.map((item) => item[dataKey]);
		const min = Math.min(...values);
		const max = Math.max(...values);
		const avg =
			values.reduce((total, current) => total + current, 0) /
			values.length;
		const baseline = values[values.length - 1] ?? value;
		const delta = value - baseline;
		const spread = max - min;
		const trend = delta > 0 ? "Rising" : delta < 0 ? "Dropping" : "Stable";

		return {
			min,
			max,
			avg,
			delta,
			spread,
			trend,
			samples: values.length,
			latest: data[0]?.localCreatedAt ?? "-",
		};
	}, [data, dataKey, value]);

	return (
		<div className="flex h-full flex-col rounded-2xl border border-slate-200/10 bg-slate-900/70 p-4 md:p-5">
			<div className="mb-4 flex items-start justify-between gap-3">
				<div>
					<p className="text-xs uppercase tracking-[0.2em] text-slate-300/75">
						Live Metric
					</p>
					<h4 className="text-lg font-semibold text-slate-100">
						{title}
					</h4>
				</div>
				<p className="text-2xl font-semibold text-sky-300">
					{value}
					<span className="ml-1 text-base text-slate-300">
						{unit}
					</span>
				</p>
			</div>

			{loading ? (
				<div className="flex h-44 items-center justify-center rounded-xl border border-slate-200/10 bg-slate-950/40">
					<MoonLoader size={70} color="#359eff" loading />
				</div>
			) : data.length > 0 ? (
				<div className="h-44 rounded-xl border border-slate-200/10 bg-slate-950/40 px-2 py-2">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={data}
							margin={{
								top: 12,
								right: 8,
								left: 0,
								bottom: 0,
							}}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								stroke="rgba(148, 163, 184, 0.2)"
							/>
							<YAxis
								width={36}
								dataKey={dataKey}
								tick={{ fill: "#cbd5e1", fontSize: 11 }}
								tickLine={false}
								axisLine={false}
							/>
							<XAxis
								dataKey="localCreatedAt"
								tick={{ fill: "#cbd5e1", fontSize: 11 }}
								tickLine={false}
								axisLine={false}
								minTickGap={24}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "#020617",
									borderColor: "rgba(148,163,184,0.25)",
									borderRadius: "10px",
									color: "#e2e8f0",
								}}
							/>
							<Area
								type="monotone"
								dataKey={dataKey}
								stroke={lineColor}
								fill={areaColor}
								fillOpacity={0.35}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			) : (
				<div className="flex h-44 items-center justify-center rounded-xl border border-slate-200/10 bg-slate-950/40 px-4 text-center text-sm text-slate-300">
					No telemetry data available for this device yet.
				</div>
			)}

			{stats && (
				<div className="mt-3 grid grow content-start grid-cols-2 gap-2 text-xs text-slate-300 sm:grid-cols-3">
					<div className="rounded-lg border border-slate-200/10 bg-slate-950/35 px-2.5 py-2">
						<p className="uppercase tracking-wide text-slate-400">
							Min
						</p>
						<p className="mt-1 font-semibold text-slate-100">
							{stats.min.toFixed(1)} {unit}
						</p>
					</div>
					<div className="rounded-lg border border-slate-200/10 bg-slate-950/35 px-2.5 py-2">
						<p className="uppercase tracking-wide text-slate-400">
							Max
						</p>
						<p className="mt-1 font-semibold text-slate-100">
							{stats.max.toFixed(1)} {unit}
						</p>
					</div>
					<div className="rounded-lg border border-slate-200/10 bg-slate-950/35 px-2.5 py-2">
						<p className="uppercase tracking-wide text-slate-400">
							Avg
						</p>
						<p className="mt-1 font-semibold text-slate-100">
							{stats.avg.toFixed(1)} {unit}
						</p>
					</div>
					<div className="rounded-lg border border-slate-200/10 bg-slate-950/35 px-2.5 py-2">
						<p className="uppercase tracking-wide text-slate-400">
							Delta
						</p>
						<p
							className={`mt-1 font-semibold ${
								stats.delta > 0
									? "text-emerald-300"
									: stats.delta < 0
										? "text-rose-300"
										: "text-slate-100"
							}`}
						>
							{stats.delta > 0 ? "+" : ""}
							{stats.delta.toFixed(1)} {unit}
						</p>
					</div>
					<div className="rounded-lg border border-slate-200/10 bg-slate-950/35 px-2.5 py-2">
						<p className="uppercase tracking-wide text-slate-400">
							Samples
						</p>
						<p className="mt-1 font-semibold text-slate-100">
							{stats.samples}
						</p>
					</div>
					<div className="rounded-lg border border-slate-200/10 bg-slate-950/35 px-2.5 py-2">
						<p className="uppercase tracking-wide text-slate-400">
							Latest
						</p>
						<p className="mt-1 truncate font-semibold text-slate-100">
							{stats.latest}
						</p>
					</div>

					<div className="col-span-2 rounded-lg border border-slate-200/10 bg-slate-950/35 px-2.5 py-2 sm:col-span-3">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<p className="uppercase tracking-wide text-slate-400">
								Telemetry Insight
							</p>
							<div className="flex flex-wrap items-center gap-2 text-[11px]">
								<span className="rounded-full bg-slate-800 px-2 py-1 font-semibold text-slate-200">
									Trend: {stats.trend}
								</span>
								<span className="rounded-full bg-slate-800 px-2 py-1 font-semibold text-slate-200">
									Spread: {stats.spread.toFixed(1)} {unit}
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

function DeviceInfo() {
	const { focusedDevice } = useDeviceStore();
	const focusedDeviceId = focusedDevice?.deviceId;
	const [voltageData, setVoltageData] = useState(0);
	const [currentData, setCurrentData] = useState(0);
	const { setShowDeviceReport } = useNavStore();
	const [chartsData, setChartsData] = useState<DevicePayload[]>([]);

	const { getDeviceLast20Payloads, loading } = usePayloadStore();

	useEffect(() => {
		if (!focusedDeviceId) {
			console.log("no focused device!");
			return;
		}

		const fetchLatestPayload = async () => {
			const last20Payloads =
				await getDeviceLast20Payloads(focusedDeviceId);

			if (last20Payloads && last20Payloads.length > 0) {
				setChartsData(last20Payloads);
				setCurrentData(last20Payloads[0].current);
				setVoltageData(last20Payloads[0].voltage);
			} else {
				setCurrentData(0);
				setVoltageData(0);
			}
		};

		fetchLatestPayload();
	}, [focusedDeviceId, getDeviceLast20Payloads]);

	const updateChartsData = (payload: DevicePayload) => {
		setChartsData((prev) => {
			const toKeep = prev.slice(0, -1);

			const updatedArray = [payload, ...toKeep];

			return updatedArray;
		});
	};

	useEffect(() => {
		if (!focusedDeviceId) {
			return;
		}

		const handleSensorPayload = (data: DevicePayload) => {
			if (data.deviceId !== focusedDeviceId) {
				return;
			}

			updateChartsData(data);
			setCurrentData(data.current);
			setVoltageData(data.voltage);
		};

		socket.on("sensorPayload", handleSensorPayload);

		return () => {
			socket.off("sensorPayload", handleSensorPayload);
		};
	}, [focusedDeviceId]);

	const handleViewReport = () => {
		setShowDeviceReport(true);
	};

	const statusColor = useMemo(() => {
		if (!focusedDevice?.status) {
			return "text-slate-200 bg-slate-700/50";
		}

		if (focusedDevice.status === "stable") {
			return "text-emerald-200 bg-emerald-600/35";
		}

		if (focusedDevice.status === "no_power") {
			return "text-rose-200 bg-rose-600/35";
		}

		return "text-amber-200 bg-amber-600/35";
	}, [focusedDevice?.status]);

	const deviceFields = useMemo(
		() => [
			{
				label: "Device ID",
				value: focusedDevice?.deviceId,
			},
			{ label: "Status", value: focusedDevice?.status },
			{
				label: "Location",
				value: `${focusedDevice?.locationName?.road} ${focusedDevice?.locationName?.brgy}, ${focusedDevice?.locationName?.city}`,
			},
			{
				label: "Coordinates",
				value: `${focusedDevice?.locationCoordinates?.lat || ""}, ${
					focusedDevice?.locationCoordinates?.lng || ""
				}`,
			},
			{
				label: "Date Installed",
				value: formatDate(focusedDevice?.createdAt || ""),
			},
		],
		[
			focusedDevice?.deviceId,
			focusedDevice?.status,
			focusedDevice?.locationName?.road,
			focusedDevice?.locationName?.brgy,
			focusedDevice?.locationName?.city,
			focusedDevice?.locationCoordinates?.lat,
			focusedDevice?.locationCoordinates?.lng,
			focusedDevice?.createdAt,
		],
	);

	return (
		<div className="grid h-full w-full gap-3 lg:grid-cols-12 lg:gap-4">
			<section className="rounded-2xl border border-slate-200/10 bg-slate-900/70 p-4 md:p-5 lg:col-span-5">
				<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-slate-300/75">
							Focused Device
						</p>
						<h3 className="text-xl font-semibold text-slate-100 md:text-2xl">
							Device Information
						</h3>
					</div>
					<button
						className="rounded-xl border border-sky-300/30 bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/35"
						onClick={handleViewReport}
					>
						View Report
					</button>
				</div>

				<div className="mb-4">
					<span
						className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusColor}`}
					>
						{focusedDevice?.status ?? "unknown"}
					</span>
				</div>

				<div className="grid gap-2">
					{deviceFields.map((item) => (
						<div
							key={item.label}
							className="rounded-xl border border-slate-200/10 bg-slate-950/35 px-3 py-2"
						>
							<p className="text-xs uppercase tracking-[0.16em] text-slate-400">
								{item.label}
							</p>
							<p className="mt-1 wrap-break-word text-sm font-semibold text-slate-100 md:text-base">
								{item.value?.toString() || "-"}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="grid h-full auto-rows-fr items-stretch gap-3 lg:col-span-7 lg:grid-cols-2 lg:gap-4">
				<TelemetryPanel
					title="Voltage Readings"
					unit="V"
					value={voltageData}
					data={chartsData}
					dataKey="voltage"
					lineColor="#38bdf8"
					areaColor="#0ea5e9"
					loading={loading}
				/>
				<TelemetryPanel
					title="Current Readings"
					unit="A"
					value={currentData}
					data={chartsData}
					dataKey="current"
					lineColor="#34d399"
					areaColor="#10b981"
					loading={loading}
				/>
			</section>
		</div>
	);
}

export default DeviceInfo;
