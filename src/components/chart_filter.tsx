interface Props {
	onChange: (query: string) => void;
	position?: string;
	value?: "week" | "month" | "all";
}

export const ChartFilter = ({ onChange, position, value = "week" }: Props) => {
	const positionClasses = position ?? "absolute right-4 top-4 z-50";

	return (
		<div
			className={`inline-flex items-center gap-2 rounded-xl border border-slate-200/10 bg-slate-950/70 px-2 py-1.5 backdrop-blur-xl ${positionClasses}`}
		>
			<label
				htmlFor="chart-filter"
				className="px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300/70"
			>
				Range
			</label>
			<select
				id="chart-filter"
				name="chart-filter"
				className="rounded-lg border border-slate-200/10 bg-slate-900/70 px-3 py-1.5 text-sm font-medium text-slate-100 outline-none transition hover:border-sky-300/30"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			>
				<option value="week">This Week</option>
				<option value="month">This Month</option>
				<option value="all">All Time</option>
			</select>
		</div>
	);
};
