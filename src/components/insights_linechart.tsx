import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { useInsightsStore } from "../store/useInsightsStore";

export const InsightsLineChart = () => {
	const { outagesFrequency } = useInsightsStore();
	const hasData = outagesFrequency.length > 0;

	return (
		<div className="flex h-full flex-col rounded-2xl border border-slate-100/10 bg-slate-900/55 p-4 backdrop-blur-sm md:p-5">
			<div className="mb-3 flex flex-wrap items-start justify-between gap-3">
				<div>
					<h3 className="mb-1 text-xl font-semibold text-slate-100 md:text-2xl">
						Outages Recorded
					</h3>

					<p className="text-sm text-slate-300/75">
						Detected events by date
					</p>
				</div>

				<p className="rounded-full border border-red-300/30 bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-200">
					+4.9% this cycle
				</p>
			</div>

			<div className="min-h-72 flex-1 pb-1">
				<LineChart
					style={{
						width: "100%",
						maxWidth: "100%",
						height: "100%",
						left: -28,
					}}
					responsive
					data={outagesFrequency}
				>
					<YAxis
						dataKey="count"
						domain={[0, "auto"]}
						tickLine={false}
						axisLine={false}
						padding={{ top: 15, bottom: 15 }}
						style={{ fontSize: "13px", fill: "#cbd5e1" }}
					/>
					<XAxis
						dataKey="date"
						interval="preserveStartEnd"
						tickLine={false}
						axisLine={false}
						padding={{ left: 15, right: 15 }}
						style={{ fontSize: "12px", fill: "#94a3b8" }}
					/>

					<Tooltip
						cursor={{ stroke: "#1d4ed8", strokeOpacity: 0.35 }}
						contentStyle={{
							background: "rgba(2, 6, 23, 0.9)",
							border: "1px solid rgba(148, 163, 184, 0.3)",
							borderRadius: "12px",
							color: "#e2e8f0",
						}}
					/>

					<Line
						type="monotone"
						dataKey="count"
						stroke="#38bdf8"
						strokeWidth={2.5}
						dot={false}
						activeDot={{
							r: 4,
							stroke: "#38bdf8",
							fill: "#38bdf8",
							strokeWidth: 2,
						}}
					/>
				</LineChart>
				{!hasData && (
					<div className="pointer-events-none -mt-16 flex justify-center">
						<p className="rounded-full border border-slate-300/15 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
							No outage data in this selected range
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
