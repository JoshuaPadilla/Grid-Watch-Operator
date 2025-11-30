import { create } from "zustand";
import type { DevicePayload } from "../interfaces/device_payload.interface";
import { BASE_URL } from "../constants/base_url.constant";

interface StoreState {
  loading: boolean;
  deviceLast20Payloads: DevicePayload[];
  getDeviceLast20Payloads: (deviceId: string) => void;
  updateDeviceLast20Payloads: (payload: DevicePayload) => void;
  getLatestPayload: (deviceId: string) => Promise<DevicePayload | null>;
}

export const usePayloadStore = create<StoreState>((set, get) => ({
  loading: false,
  deviceLast20Payloads: [],
  getDeviceLast20Payloads: async (deviceId) => {
    try {
      set({ loading: true });
      const res = await fetch(`${BASE_URL}sensor/${deviceId}`, {
        method: "Get",
      });

      const data = await res.json();

      if (res.ok) {
        set({ deviceLast20Payloads: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  updateDeviceLast20Payloads: (payload) => {
    set((state) => {
      const updatedPayloads = [
        payload,
        ...state.deviceLast20Payloads.slice(0, -1),
      ];
      return { deviceLast20Payloads: updatedPayloads };
    });
  },

  getLatestPayload: async (deviceId) => {
    try {
      set({ loading: true });
      const res = await fetch(`${BASE_URL}sensor/latest/${deviceId}`, {
        method: "Get",
      });

      const data = await res.json();

      if (res.ok) {
        return data;
      }

      return null;
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
