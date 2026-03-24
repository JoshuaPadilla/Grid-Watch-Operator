import { Icons } from "../constants/icons.constant";
import type { History } from "../interfaces/history.interface";

interface Props {
	history: History[];
}
export const HistoryInsightss = ({ history }: Props) => {
	const totalOutages = history.filter(
		(history) => history.status === "outage",
	).length;
	const totalnotif = history.filter(
		(history) => history.status === "notif",
	).length;
	const totalRestored = history.filter(
		(history) => history.status === "restored",
	).length;

	return (
		<div className="mb-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
			<article className="rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 backdrop-blur-xl">
				<div className="mb-2 flex items-center justify-between gap-2">
					<p className="text-xs uppercase tracking-[0.16em] text-rose-200/90">
						Outages
					</p>
					<img src={Icons.outage} className="size-8" />
				</div>
				<h3 className="text-3xl font-bold text-slate-100">
					{totalOutages}
				</h3>
				<p className="mt-1 text-sm text-slate-300/85">
					Total outage events
				</p>
			</article>

			<article className="rounded-2xl border border-sky-300/20 bg-sky-500/10 p-4 backdrop-blur-xl">
				<div className="mb-2 flex items-center justify-between gap-2">
					<p className="text-xs uppercase tracking-[0.16em] text-sky-200/90">
						Information
					</p>
					<img src={Icons.notif} className="size-8" />
				</div>
				<h3 className="text-3xl font-bold text-slate-100">
					{totalnotif}
				</h3>
				<p className="mt-1 text-sm text-slate-300/85">
					Status update notices
				</p>
			</article>

			<article className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 backdrop-blur-xl">
				<div className="mb-2 flex items-center justify-between gap-2">
					<p className="text-xs uppercase tracking-[0.16em] text-emerald-200/90">
						Restored
					</p>
					<img src={Icons.restored} className="size-8" />
				</div>
				<h3 className="text-3xl font-bold text-slate-100">
					{totalRestored}
				</h3>
				<p className="mt-1 text-sm text-slate-300/85">
					Recovered outage events
				</p>
			</article>
		</div>
	);
};
