import { MoonLoader } from "react-spinners";
import { Icons } from "../constants/icons.constant";
import { useInsightsStore } from "../store/useInsightsStore";
import { InsightsNumbersComponents } from "./insights_numbers_components";

interface Props {
	filterLabel: string;
}

export const InsightsNumbers = ({ filterLabel }: Props) => {
	const { insightsNumbers, loading } = useInsightsStore();
	const stableGrids =
		insightsNumbers?.stableGrids ?? insightsNumbers?.stableDevices ?? 0;

	const metrics = [
		{
			icon: Icons.insights_device,
			title: "Total Devices",
			value: insightsNumbers?.totalDevices,
		},
		{
			icon: Icons.insights_outage,
			title: "Outages Recorded",
			value: insightsNumbers?.outagesReported,
		},
		{
			icon: Icons.insights_stable,
			title: "Stable Grids",
			value: stableGrids,
		},
		{
			icon: Icons.insights_restored,
			title: "Total Restored",
			value: insightsNumbers?.totalRestored,
		},
	];

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 className="text-lg font-semibold text-slate-100 md:text-xl">
						Network Snapshot
					</h2>
					<p className="text-sm text-slate-300/75">
						A quick health overview of your monitored grid devices.
					</p>
				</div>

				<span className="rounded-full border border-sky-300/30 bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-200">
					{filterLabel}
				</span>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{loading
					? metrics.map((metric) => (
							<div
								key={metric.title}
								className="flex min-h-36 items-center justify-center rounded-2xl border border-slate-100/10 bg-slate-950/50"
							>
								<MoonLoader
									size={36}
									color="#359eff"
									loading={loading}
								/>
							</div>
						))
					: metrics.map((metric) => (
							<InsightsNumbersComponents
								key={metric.title}
								icon={metric.icon}
								title={metric.title}
								value={metric.value}
							/>
						))}
			</div>
		</div>
	);
};
