interface Props {
	icon: string;
	value?: number;
	title: string;
}

export const InsightsNumbersComponents = ({ icon, title, value }: Props) => {
	return (
		<article className="flex min-h-36 flex-col justify-between rounded-2xl border border-slate-100/10 bg-slate-900/55 p-4 backdrop-blur-sm">
			<div className="flex items-center gap-3">
				<div className="rounded-xl border border-sky-300/25 bg-sky-500/10 p-2">
					<img src={icon} className="size-8" alt={title} />
				</div>
				<p className="text-sm font-semibold uppercase tracking-wider text-slate-300/80">
					{title}
				</p>
			</div>

			<h3 className="text-center text-4xl font-bold text-slate-100">
				{value || 0}
			</h3>
		</article>
	);
};
