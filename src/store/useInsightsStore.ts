import { create } from "zustand";
import type { InsightsNumbers } from "../interfaces/insights_numbers.interface";
import { BASE_URL } from "../constants/base_url.constant";
import type { OutagesFrequency } from "../interfaces/outages_frequency.interface";

interface StoreState {
  loading: boolean;
  outagesFrequency: OutagesFrequency[];
  insightsNumbers: InsightsNumbers | undefined;
  getInsightsNumbers: () => void;
  getOutagesFrequency: () => void;
}

export const useInsightsStore = create<StoreState>((set) => ({
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
}));
