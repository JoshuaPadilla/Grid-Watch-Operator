import { useInsightsStore } from "../../store/useInsightsStore";
import { ChartFilter } from "../chart_filter";
import { InsightsChartsContainer } from "../insights_charts_container";
import { InsightsNumbers } from "../insights_numbers";

export const Insights = () => {
	const { getOutagesFrequency, getInsightsNumbers } = useInsightsStore();

	const handleOnChangeFilter = (filter: string) => {
		getOutagesFrequency(filter);
		getInsightsNumbers(filter);
	};

	return (
		<div className="relative min-h-dvh w-full overflow-x-hidden overflow-y-auto bg-(--background) p-4 md:p-6">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-6 top-0 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
				<div className="absolute bottom-12 right-8 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
			</div>

			<div className="relative z-10 flex flex-col gap-4">
				<section className="rounded-3xl border border-slate-100/10 bg-slate-900/45 p-4 backdrop-blur-sm md:p-5">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div>
							<p className="text-xs uppercase tracking-[0.22em] text-slate-300/75">
								GridWatch Analytics
							</p>
							<h1 className="mt-1 text-2xl font-semibold text-slate-100 md:text-3xl">
								Insights Overview
							</h1>
							<p className="mt-1 text-sm text-slate-300/80">
								Track outage movement, recovery trends, and
								device stability in one place.
							</p>
						</div>

						<ChartFilter
							onChange={handleOnChangeFilter}
							position="static z-auto"
						/>
					</div>
				</section>

				<section className="rounded-3xl border border-slate-100/10 bg-slate-900/35 p-4 shadow-2xl shadow-black/20 md:p-5">
					<InsightsNumbers />
				</section>

				<section className="rounded-3xl border border-slate-100/10 bg-slate-900/35 p-3 shadow-2xl shadow-black/20 md:p-4">
					<InsightsChartsContainer />
				</section>
			</div>
		</div>
	);
};
