import { getHistoryColor } from "../app/helpers/getHistoryColor";
import { getHistoryIcon } from "../app/helpers/getHistoryIcon";
import { textShortener } from "../app/helpers/textShortener";
import type { History } from "../interfaces/history.interface";
import { useHistoryStore } from "../store/useHistory";

interface Props {
	history: History;
}

export const HistoryCard = ({ history }: Props) => {
	const { setSelectedHistory, selectedHistory } = useHistoryStore();

	const focused = selectedHistory?._id === history._id;
	const icon = getHistoryIcon(history.status);
	const color = getHistoryColor(history.status);

	return (
		<button
			onClick={() => setSelectedHistory(history)}
			className={`w-full rounded-2xl border p-3 text-left transition ${
				focused
					? "border-sky-300/40 bg-sky-500/20"
					: "border-slate-200/10 bg-slate-950/45 hover:border-slate-300/25"
			}`}
			style={{ borderLeftWidth: 4, borderLeftColor: color }}
		>
			<div className="flex items-start gap-3">
				<div className="rounded-xl border border-slate-200/10 bg-slate-900/80 p-2">
					<img src={icon} className="size-6" />
				</div>

				<div className="min-w-0 flex-1">
					<div className="mb-1 flex items-center justify-between gap-2">
						<h3 className="truncate text-base font-semibold text-slate-100">
							{history.title}
						</h3>
						<span className="rounded-full border border-slate-200/10 bg-slate-900/70 px-2 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">
							{history.status}
						</span>
					</div>
					<p className="text-sm text-slate-300/90">
						{textShortener(history?.body, 80)}
					</p>
				</div>
			</div>
		</button>
	);
};
