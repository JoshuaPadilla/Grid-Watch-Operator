import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	ZoomControl,
} from "react-leaflet";
import { getDevicePopUpIcon } from "../app/helpers/getDevicePopUpIcon";
import { useDeviceStore } from "../store/useDeviceStore";

export const DeviceReportMap = () => {
	const { focusedDevice } = useDeviceStore();

	const center: [number, number] = focusedDevice
		? [
				Number(focusedDevice?.locationCoordinates?.lat),
				Number(focusedDevice.locationCoordinates?.lng),
			]
		: [12.067464704041424, 124.5924237721899];

	const icon = getDevicePopUpIcon(focusedDevice?.status);

	return (
		<section className="flex h-full min-h-88 flex-col overflow-hidden rounded-3xl border border-slate-200/10 bg-slate-900/75 p-3 shadow-xl shadow-black/20 xl:min-h-0">
			<div className="mb-3 flex items-start justify-between gap-3 px-1">
				<div>
					<p className="text-xs uppercase tracking-[0.18em] text-slate-400">
						Geo Context
					</p>
					<h3 className="text-lg font-semibold text-slate-100">
						Device Location Map
					</h3>
				</div>
				<div className="rounded-full border border-slate-200/10 bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-300">
					Zoom 22
				</div>
			</div>

			<div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200/10">
				<MapContainer
					center={center}
					zoom={22}
					scrollWheelZoom
					className="h-full w-full"
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					<ZoomControl position="topright" />

					<Marker position={center} icon={icon}>
						<Popup>
							{`${focusedDevice?.locationName?.road} ${focusedDevice?.locationName?.brgy}, ${focusedDevice?.locationName?.city}`}
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		</section>
	);
};
