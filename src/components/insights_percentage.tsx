import { PieChart } from "@mui/x-charts";
import { useInsightsStore } from "../store/useInsightsStore";

const InsightsPercentage = () => {
	const { insightsNumbers } = useInsightsStore();

	const totalDevices = insightsNumbers?.totalDevices ?? 0;
	const stableDevices =
		insightsNumbers?.stableGrids ?? insightsNumbers?.stableDevices ?? 0;
	const unstableDevices = Math.max(totalDevices - stableDevices, 0);

	const healthPercentage =
		totalDevices > 0 ? Math.round((stableDevices / totalDevices) * 100) : 0;

	const pieData = [
		{ label: "Stable", value: stableDevices, color: "#22c55e" },
		{ label: "Unstable", value: unstableDevices, color: "#fb7185" },
	];

	return (
		<div className="flex h-full flex-col rounded-2xl border border-slate-100/10 bg-slate-900/55 p-4 backdrop-blur-sm md:p-5">
			<div>
				<h3 className="text-xl font-semibold text-slate-100 md:text-2xl">
					System Health
				</h3>
				<p className="text-sm text-slate-300/75">
					Stability ratio across all monitored devices.
				</p>
			</div>

			<div className="relative mt-2 flex flex-1 items-center justify-center overflow-hidden">
				<PieChart
					width={260}
					height={190}
					hideLegend
					series={[
						{
							innerRadius: 62,
							outerRadius: 88,
							data: pieData,
							startAngle: -110,
							endAngle: 110,
							cornerRadius: 4,
							cx: 130,
							cy: 112,
						},
					]}
				/>

				<div className="pointer-events-none absolute top-1/2 -translate-y-1/3 text-center">
					<p className="text-4xl font-bold text-slate-100">
						{healthPercentage}%
					</p>
					<p className="text-xs uppercase tracking-wider text-slate-400">
						Healthy
					</p>
				</div>
			</div>

			<div className="mt-1 grid grid-cols-2 gap-2 text-xs">
				<div className="rounded-lg border border-emerald-300/20 bg-emerald-500/10 px-2 py-1.5 text-center text-emerald-200">
					Stable: {stableDevices}
				</div>
				<div className="rounded-lg border border-rose-300/20 bg-rose-500/10 px-2 py-1.5 text-center text-rose-200">
					Unstable: {unstableDevices}
				</div>
			</div>
		</div>
	);
};

export default InsightsPercentage;
