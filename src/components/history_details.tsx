import { getDeviceStatusColor } from "../app/helpers/getDeviceStatusColor";
import { getDeviceStatusText } from "../app/helpers/getDeviceStatusText";
import { Icons } from "../constants/icons.constant";
import type { Device } from "../interfaces/device.interface";
import type { History } from "../interfaces/history.interface";

interface Props {
	device: Device | undefined;
	history: History;
}

export const HistoryDetails = ({ device, history }: Props) => {
	const statusColor = getDeviceStatusColor(device?.status);

	return (
		<div className="z-9999 absolute inset-x-4 bottom-4 z-40 max-h-[45%] overflow-y-auto rounded-2xl border border-slate-200/15 bg-slate-950/75 p-4 text-slate-100 shadow-2xl shadow-black/35 backdrop-blur-xl">
			<div className="mb-3 flex items-start justify-between gap-3">
				<div>
					<p className="text-xs uppercase tracking-[0.16em] text-slate-400">
						Selected Event
					</p>
					<h3 className="mt-1 text-lg font-semibold">
						{history.title}
					</h3>
				</div>

				<div
					className="rounded-full px-3 py-1"
					style={{ backgroundColor: statusColor }}
				>
					<h2 className="text-xs font-bold uppercase tracking-wider text-white">
						{getDeviceStatusText(device?.status || "no_power")}
					</h2>
				</div>
			</div>

			<div className="mb-3 flex items-center gap-2 rounded-xl border border-slate-200/10 bg-slate-900/75 p-3">
				<img src={Icons.location} className="size-5" />

				<h3 className="text-sm text-slate-200">
					{device?.locationName?.road}, {device?.locationName?.brgy}{" "}
					{device?.locationName?.city}
				</h3>
			</div>

			<div className="rounded-xl border border-slate-200/10 bg-slate-900/75 p-3">
				<p className="text-sm font-medium leading-6 text-slate-100">
					{history.body}
				</p>
			</div>
		</div>
	);
};
