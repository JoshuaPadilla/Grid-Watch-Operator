import { useInsightsStore } from "../store/useInsightsStore";
import { DeviceReportCard } from "./device_report_card";

export const DeviceReportCardContainer = () => {
	const { barChartData } = useInsightsStore();

	return (
		<div className="grid h-full min-h-0 grid-cols-1 gap-3 overflow-hidden sm:grid-cols-2">
			<DeviceReportCard
				percentageValue={Math.floor(
					barChartData?.relativeOutageValue || 0,
				)}
				title="Outage Recorded"
				value={barChartData?.totalOutage || 0}
				emptyColor="#2a3a2f"
				valueColor="#ff6467"
			/>
			<DeviceReportCard
				percentageValue={Math.ceil(
					barChartData?.relativeRestoredValue || 0,
				)}
				title="Restored Grids"
				value={barChartData?.totalRestored || 0}
				emptyColor="#24352b"
				valueColor="#05df72"
			/>
		</div>
	);
};
