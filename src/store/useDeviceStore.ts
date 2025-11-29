import { create } from "zustand";
import type { Device } from "../interfaces/device.interface";
import { BASE_URL } from "../constants/base_url.constant";
import type { DevicePayload } from "../interfaces/device_payload.interface";

interface StoreState {
  focusedDevice: Device | null;
  deviceLast20Payloads: DevicePayload[];
  devices: Device[];
  getDevices: () => void;
  addDevice: (deviceId: string) => void;
  updateDevices: (device: Device) => void;
  setFocusedDevice: (device: Device) => void;
}

export const useDeviceStore = create<StoreState>((set, get) => ({
  focusedDevice: null,
  deviceLast20Payloads: [],
  devices: [],
  getDevices: async () => {
    try {
      const res = await fetch(`${BASE_URL}device`, {
        method: "GET",
      });

      const data = await res.json();
      if (res.ok) {
        set({ devices: data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  addDevice: async (deviceId) => {
    try {
      const res = await fetch(`${BASE_URL}device`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ deviceId: deviceId }),
      });

      const data = await res.json();

      if (res.ok) {
        set((state) => ({
          devices: [
            ...state.devices, // Spread the existing devices array
            data as Device, // Append the new device object
          ],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },

  updateDevices: (device) => {
    // set((state) => {
    //   const updatedDevices = state.devices.map((device) =>
    //     student.id === state.selectedStudent?.id
    //       ? { ...student, ...data }
    //       : student
    //   );
    //   return {
    //     students: updatedStudents,
    //   };
    // });
  },

  setFocusedDevice: (device) => {
    set({ focusedDevice: device });
  },
}));
