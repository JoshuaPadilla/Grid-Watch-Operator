export interface BarChartData {
  restored?: number;
  outage?: number;
  name: string;
  [key: string]: string | number | undefined;
}
