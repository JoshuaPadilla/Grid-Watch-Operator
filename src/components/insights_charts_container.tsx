import { InsightsLineChart } from "./insights_linechart";
import InsightsPercentage from "./insights_percentage";

export const InsightsChartsContainer = () => {
	return (
		<div className="h-fit flex flex-col gap-4">
			<div className="flex flex-wrap items-start justify-between gap-3 px-1">
				<div>
					<h2 className="text-lg font-semibold text-slate-100 md:text-xl">
						Reliability Trends
					</h2>
					<p className="text-sm text-slate-300/75">
						Outage activity and overall system health over time.
					</p>
				</div>

				<span className="rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200">
					Predictive View
				</span>
			</div>

			<div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
				<div className="xl:col-span-8">
					<InsightsLineChart />
				</div>

				<div className="xl:col-span-4">
					<InsightsPercentage />
				</div>
			</div>
		</div>
	);
};
