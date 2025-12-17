import { create } from "zustand";
import type { InsightsNumbers } from "../interfaces/insights_numbers.interface";
import { BASE_URL } from "../constants/base_url.constant";
import type { OutagesFrequency } from "../interfaces/outages_frequency.interface";
import type { BarChartData } from "../interfaces/barchart_data.interface";

interface StoreState {
  loading: boolean;
  outagesFrequency: OutagesFrequency[];
  barChartData: BarChartData | undefined;
  insightsNumbers: InsightsNumbers | undefined;
  getInsightsNumbers: (filter: string) => void;
  getOutagesFrequency: (filter: string) => void;
  getBarChartData: (deviceId: string, filter: string) => void;
}

export const useInsightsStore = create<StoreState>((set) => ({
  barChartData: undefined,
  outagesFrequency: [],
  loading: false,
  insightsNumbers: undefined,
  getInsightsNumbers: async (filter) => {
    try {
      set({ loading: true });
      const res = await fetch(`${BASE_URL}insights?filter=${filter}`, {
        method: "Get",
      });

      const data = await res.json();

      if (res.ok) {
        set({ insightsNumbers: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  getOutagesFrequency: async (filter) => {
    try {
      set({ loading: true });
      const res = await fetch(
        `${BASE_URL}insights/outages_frequency?filter=${filter}`,
        {
          method: "Get",
        }
      );

      const data = await res.json();

      if (res.ok) {
        set({ outagesFrequency: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  getBarChartData: async (deviceId, filter) => {
    try {
      set({ loading: true });
      const res = await fetch(
        `${BASE_URL}insights/outage_barchart_data/${deviceId}?filter=${filter}`,
        {
          method: "Get",
        }
      );

      const data = await res.json();

      if (res.ok) {
        set({ barChartData: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
