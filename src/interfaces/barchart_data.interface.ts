export interface BarChartDataFrequency {
  restored?: number;
  outage?: number;
  name: string;
  [key: string]: string | number | undefined;
}

export interface BarChartData {
  data: BarChartDataFrequency[];
  relativeOutageValue: number;
  relativeRestoredValue: number;
  totalRestored: number;
  totalOutage: number;
}
