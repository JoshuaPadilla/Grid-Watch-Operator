import { useHistoryStore } from "../store/useHistory";

export const HistoryFilter = () => {
	const { getAllHistory } = useHistoryStore();

	const handleChangeFilter = (query: string) => {
		getAllHistory(`filter=${query}`);
	};

	return (
		<select
			id="history-filter"
			name="history-filter"
			defaultValue="This Week"
			className="h-fit rounded-xl border border-slate-200/10 bg-slate-950/70 px-3 py-2 text-sm font-medium text-slate-100 outline-none backdrop-blur-xl transition hover:border-sky-300/30"
			onChange={(e) => handleChangeFilter(e.target.value)}
		>
			<option value="Today">Today</option>
			<option value="This Week">This Week</option>
			<option value="This Month">This Month</option>
		</select>
	);
};
