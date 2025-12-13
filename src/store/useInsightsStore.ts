import { create } from "zustand";
import type { InsightsNumbers } from "../interfaces/insights_numbers.interface";
import { BASE_URL } from "../constants/base_url.constant";
import type { OutagesFrequency } from "../interfaces/outages_frequency.interface";
import type { BarChartData } from "../interfaces/barchart_data.interface";

interface StoreState {
  loading: boolean;
  outagesFrequency: OutagesFrequency[];
  barChartData: BarChartData[];
  insightsNumbers: InsightsNumbers | undefined;
  getInsightsNumbers: () => void;
  getOutagesFrequency: () => void;
  getBarChartData: (filter: string) => void;
}

export const useInsightsStore = create<StoreState>((set) => ({
  barChartData: [],
  outagesFrequency: [],
  loading: false,
  insightsNumbers: undefined,
  getInsightsNumbers: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${BASE_URL}insights`, {
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

  getOutagesFrequency: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${BASE_URL}insights/outages_frequency`, {
        method: "Get",
      });

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
  getBarChartData: async (filter) => {
    try {
      set({ loading: true });
      const res = await fetch(
        `${BASE_URL}insights/outage_barchart_data?filter=${filter}`,
        {
          method: "Get",
        }
      );

      const data = await res.json();

      console.log(data);

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
