import { useEffect, useState } from "react";
import type { Device } from "../../interfaces/device.interface";
import { useDeviceStore } from "../../store/useDeviceStore";
import { useHistoryStore } from "../../store/useHistory";
import { HistoryCard } from "../history_card";
import { HistoryDetails } from "../history_details";
import { HistoryFilter } from "../history_filter";
import { HistoryInsightss } from "../history_insights";
import { HistoryMap } from "../history_map";
import { SearchBar } from "../search_bar";

const HistoryComponent = () => {
	const { getAllHistory, history, selectedHistory } = useHistoryStore();

	const [device, setDevice] = useState<Device | undefined>(undefined);
	const [query, setQuery] = useState("");

	const { getDevice } = useDeviceStore();

	useEffect(() => {
		if (selectedHistory) {
			const fetchDevice = async () => {
				const result = await getDevice(selectedHistory?.deviceId);

				if (result) {
					setDevice(result);
				}
			};

			fetchDevice();
		}
	}, [selectedHistory, getDevice]);

	useEffect(() => {
		getAllHistory();
	}, [getAllHistory]);

	const normalizedQuery = query.trim().toLowerCase();

	const filteredHistory = normalizedQuery
		? history.filter((item) =>
				`${item.title} ${item.body} ${item.status}`
					.toLowerCase()
					.includes(normalizedQuery),
			)
		: history;

	const selectedLabel = selectedHistory
		? `${selectedHistory.title} • ${selectedHistory.status}`
		: "No history item selected";

	return (
		<div className="relative min-h-dvh w-full overflow-x-hidden overflow-y-auto bg-(--background) p-4 md:p-6">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-20 left-8 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
				<div className="absolute bottom-8 right-8 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
			</div>

			<div className="relative z-10 flex flex-col gap-4">
				<section className="rounded-3xl border border-slate-200/10 bg-slate-900/45 p-4 backdrop-blur-sm">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div>
							<p className="text-xs uppercase tracking-[0.22em] text-slate-300/75">
								Historical Events
							</p>
							<h1 className="mt-1 text-2xl font-semibold text-slate-100 md:text-3xl">
								Grid History Timeline
							</h1>
							<p className="mt-1 text-sm text-slate-300/80">
								{selectedLabel}
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-3">
							<span className="rounded-full border border-slate-200/10 bg-slate-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
								{filteredHistory.length} shown
							</span>
							<HistoryFilter />
						</div>
					</div>
				</section>

				<section className="grid gap-4 xl:grid-cols-12">
					<div className="rounded-3xl border border-slate-100/10 bg-slate-900/55 p-4 shadow-2xl shadow-black/20 xl:col-span-4">
						<SearchBar query={query} onChangeQuery={setQuery} />

						<div className="mb-3 flex items-center justify-between">
							<h3 className="text-lg font-semibold text-slate-100">
								History Feed
							</h3>
							<span className="text-xs text-slate-300/80">
								Latest events first
							</span>
						</div>

						<div className="hide-scrollbar flex max-h-[calc(100dvh-18rem)] flex-col gap-2 overflow-y-auto pr-1 xl:max-h-[calc(100dvh-14.5rem)]">
							{filteredHistory.length > 0 ? (
								filteredHistory.map((history) => (
									<HistoryCard
										history={history}
										key={history._id}
									/>
								))
							) : (
								<div className="rounded-2xl border border-slate-200/10 bg-slate-950/45 p-4 text-sm text-slate-300">
									No history records found for your current
									search.
								</div>
							)}
						</div>
					</div>

					<div className="rounded-3xl border border-slate-100/10 bg-slate-900/55 p-4 shadow-2xl shadow-black/20 xl:col-span-8">
						<HistoryInsightss history={filteredHistory} />

						<div className="relative mt-1 h-104 overflow-hidden rounded-2xl border border-slate-200/10 md:h-128 xl:h-[calc(100dvh-20rem)]">
							<HistoryMap device={device} />

							{selectedHistory && (
								<HistoryDetails
									device={device}
									history={selectedHistory}
								/>
							)}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default HistoryComponent;
