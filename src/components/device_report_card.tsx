import { LinearProgress, linearProgressClasses } from "@mui/material";

interface Props {
	title: string;
	value: number;
	percentageValue: number;
	valueColor: string;
	emptyColor: string;
}

export const DeviceReportCard = ({
	title,
	emptyColor,
	value,
	percentageValue,
	valueColor,
}: Props) => {
	return (
		<article className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200/10 bg-slate-900/70 p-3 shadow-xl shadow-black/20">
			<div className="mb-2 flex items-start justify-between gap-2">
				<div>
					<p className="text-xs uppercase tracking-[0.16em] text-slate-400">
						Summary Card
					</p>
					<p className="mt-1 text-xs font-semibold text-slate-100 sm:text-sm">
						{title}
					</p>
				</div>

				<span className="rounded-full border border-slate-200/10 bg-slate-950/50 px-3 py-1 text-xs font-semibold text-slate-200">
					{percentageValue}%
				</span>
			</div>

			<div className="mb-2 flex flex-1 flex-col justify-end">
				<h3 className="text-2xl font-bold text-white">{value}</h3>
				<p className="mt-1 text-[10px] text-slate-400">
					Selected filter share
				</p>
			</div>

			<LinearProgress
				variant="determinate"
				value={percentageValue}
				sx={{
					height: 16,
					borderRadius: 99,
					[`&.${linearProgressClasses.colorPrimary}`]: {
						backgroundColor: emptyColor,
					},
					[`& .${linearProgressClasses.bar}`]: {
						borderRadius: 99,
						backgroundColor: valueColor,
					},
				}}
			/>

			<div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
				<span>0%</span>
				<span className="font-semibold text-slate-200">Share</span>
				<span>100%</span>
			</div>
		</article>
	);
};
