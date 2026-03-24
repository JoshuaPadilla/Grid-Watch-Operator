import { Icons } from "../../constants/icons.constant";
import { useNavStore } from "../../store/useNavStore";
import { NAVIGATION } from "../../types/nav.type";

function Header() {
	const { changeNav, activeNav } = useNavStore();

	const navItems = [
		{ label: "Dashboard", value: NAVIGATION.DASHBOARD },
		{ label: "History", value: NAVIGATION.HISTORY },
		{ label: "Insights", value: NAVIGATION.INSIGHTS },
	];

	return (
		<header className="sticky top-0 z-40 border-b border-slate-100/10 bg-slate-950/75 px-4 py-3 backdrop-blur-xl md:px-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex items-center gap-3 md:gap-4">
					<div className="flex size-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-500/10 shadow-lg shadow-sky-500/10">
						<img
							src={Icons.app_logo}
							alt="GridWatch logo"
							className="size-8"
						/>
					</div>

					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
							Grid Intelligence Hub
						</p>
						<div className="mt-1 flex flex-wrap items-center gap-2">
							<span className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-200">
								Live Monitoring
							</span>
						</div>
					</div>
				</div>

				<nav className="overflow-x-auto">
					<ul className="flex min-w-max items-center gap-2 rounded-2xl border border-slate-100/10 bg-slate-900/55 p-2 shadow-xl shadow-black/20">
						{navItems.map((item) => {
							const isActive = activeNav === item.value;

							return (
								<li key={item.value}>
									<button
										onClick={() =>
											changeNav(item.value, true)
										}
										className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
											isActive
												? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
												: "text-slate-300 hover:bg-slate-800/80 hover:text-slate-100"
										}`}
									>
										{item.label}
									</button>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
