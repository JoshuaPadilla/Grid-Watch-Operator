interface Props {
	onChange: (query: string) => void;
	position?: string;
}

export const ChartFilter = ({ onChange, position }: Props) => {
	const handleChangeFilter = (query: string) => {
		onChange(query);
	};

	const positionClasses = position ?? "absolute right-4 top-4 z-50";

	return (
		<select
			id="fruits"
			name="favorite_fruit"
			className={`h-fit rounded-xl border border-slate-200/10 bg-slate-950/70 px-3 py-2 text-sm font-medium text-slate-100 outline-none backdrop-blur-xl transition hover:border-sky-300/30 ${positionClasses}`}
			defaultValue="week"
			onChange={(e) => handleChangeFilter(e.target.value)}
		>
			<option value="week">This Week</option>
			<option value="month">This Month</option>
			<option value="all">All</option>
		</select>
	);
};
