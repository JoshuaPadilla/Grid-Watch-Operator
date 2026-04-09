import { PieChart } from "@mui/x-charts";
import { useEffect, useMemo, useState } from "react";
import socket from "../lib/socket";
import { useDeviceStore } from "../store/useDeviceStore";

interface PredictionPayload {
	deviceId?: string;
	deviceID?: string;
	device_id?: string;
	riskScore?: number | string;
	risk_score?: number | string;
}

export const DeviceReportOutagePercentage = () => {
	const { focusedDevice } = useDeviceStore();
	const focusedDeviceId = focusedDevice?.deviceId;
	const [predictionData, setPredictionData] = useState([
		{ label: "Risk Score", value: 0, color: "#bedbff" },
		{ label: "Stable", value: 100, color: "#51a2ff" },
	]);
	const [riskPercentage, setRiskPercentage] = useState(0);

	const stablePercentage = 100 - riskPercentage;

	const summary = useMemo(() => {
		if (riskPercentage >= 70) {
			return {
				tone: "High outage risk",
				detail: "This device should be monitored closely for imminent outages.",
				badge: "text-rose-200 bg-rose-500/20 border-rose-400/30",
			};
		}

		if (riskPercentage >= 35) {
			return {
				tone: "Moderate risk",
				detail: "The device is fluctuating and may require preventative checks.",
				badge: "text-amber-200 bg-amber-500/20 border-amber-400/30",
			};
		}

		return {
			tone: "Low risk",
			detail: "Current prediction indicates stable operation with low outage likelihood.",
			badge: "text-emerald-200 bg-emerald-500/20 border-emerald-400/30",
		};
	}, [riskPercentage]);

	useEffect(() => {
		if (!focusedDeviceId) {
			return;
		}

		const joinDeviceRoom = () => {
			socket.emit("connectDevice", { deviceId: focusedDeviceId });
		};

		if (socket.connected) {
			joinDeviceRoom();
		}

		socket.on("connect", joinDeviceRoom);

		return () => {
			socket.off("connect", joinDeviceRoom);
			socket.emit("disconnectDevice", { deviceId: focusedDeviceId });
		};
	}, [focusedDeviceId]);

	useEffect(() => {
		const handlePrediction = (payload: PredictionPayload) => {
			const payloadDeviceId =
				payload.deviceId || payload.deviceID || payload.device_id;

			if (payloadDeviceId && payloadDeviceId !== focusedDeviceId) {
				return;
			}

			const rawRisk = payload.riskScore ?? payload.risk_score;
			const parsedRisk = Number(rawRisk);

			if (!Number.isFinite(parsedRisk)) {
				return;
			}

			const normalizedRisk =
				parsedRisk <= 1 ? parsedRisk * 100 : parsedRisk;
			const risk = Math.max(0, Math.min(100, Math.round(normalizedRisk)));
			const stable = 100 - risk;

			setRiskPercentage(risk);
			setPredictionData([
				{
					label: "Risk Score",
					value: risk,
					color: "#bedbff",
				},
				{ label: "Stable", value: stable, color: "#51a2ff" },
			]);
		};

		socket.on("prediction", handlePrediction);

		return () => {
			socket.off("prediction", handlePrediction);
		};
	}, [focusedDeviceId]);

	return (
		<section className="flex h-full min-h-88 flex-col overflow-hidden rounded-3xl border border-slate-200/10 bg-slate-900/75 p-4 shadow-xl shadow-black/20 xl:min-h-0">
			<div className="mb-4 flex items-start justify-between gap-3">
				<div>
					<p className="text-xs uppercase tracking-[0.18em] text-slate-400">
						Forecast
					</p>
					<h3 className="text-lg font-semibold text-slate-100">
						Device Outage Prediction
					</h3>
				</div>
				<span
					className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${summary.badge}`}
				>
					{summary.tone}
				</span>
			</div>

			<div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[1fr_0.95fr]">
				<div className="flex min-h-0 flex-col rounded-2xl border border-slate-200/10 bg-slate-950/40 p-4">
					<div className="relative flex flex-1 items-center justify-center">
						<h3 className="absolute text-2xl font-bold text-slate-100">
							{riskPercentage}%
						</h3>
						<PieChart
							height={150}
							sx={{
								"& .MuiChartsLegend-root": {
									display: "none",
								},
								"& .MuiPieArc-root": {
									stroke: "none",
								},
							}}
							series={[
								{
									innerRadius: "62%",
									outerRadius: "100%",
									data: predictionData.map((item, index) => ({
										id: index,
										value: item.value,
										label: item.label,
										color: item.color,
									})),
									cornerRadius: 6,
									startAngle: -180,
									endAngle: 180,
									paddingAngle: 4,
								},
							]}
						/>
					</div>

					<div className="grid grid-cols-2 gap-2 text-sm">
						<div className="rounded-xl border border-slate-200/10 bg-slate-900/80 px-3 py-2">
							<p className="text-slate-400">Outage Risk</p>
							<p className="mt-1 font-semibold text-slate-100">
								{riskPercentage}%
							</p>
						</div>
						<div className="rounded-xl border border-slate-200/10 bg-slate-900/80 px-3 py-2">
							<p className="text-slate-400">Stable Window</p>
							<p className="mt-1 font-semibold text-slate-100">
								{stablePercentage}%
							</p>
						</div>
					</div>
				</div>

				<div className="flex min-h-0 flex-col gap-3">
					<div className="rounded-2xl border border-slate-200/10 bg-slate-950/40 p-3">
						<p className="text-xs uppercase tracking-[0.16em] text-slate-400">
							Interpretation
						</p>
						<p className="mt-2 text-sm leading-5 text-slate-200">
							{summary.detail}
						</p>
					</div>

					<div className="grid gap-2 text-sm">
						<div className="rounded-xl border border-slate-200/10 bg-slate-950/40 px-3 py-2">
							<p className="text-slate-400">Model Split</p>
							<p className="mt-1 font-semibold text-slate-100">
								{predictionData[0].label} vs{" "}
								{predictionData[1].label}
							</p>
						</div>
						<div className="rounded-xl border border-slate-200/10 bg-slate-950/40 px-3 py-2">
							<p className="text-slate-400">Recommended Action</p>
							<p className="mt-1 font-semibold text-slate-100">
								{riskPercentage >= 35
									? "Inspect grid stability"
									: "Continue monitoring"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
