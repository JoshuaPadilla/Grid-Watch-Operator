import { create } from "zustand";
import type { Device } from "../interfaces/device.interface";
import { BASE_URL } from "../constants/base_url.constant";
import type { DevicePayload } from "../interfaces/device_payload.interface";
import type { DeviceStatusType } from "../types/device_status.type";

interface StoreState {
  focusedDevice: Device | null;
  deviceLast20Payloads: DevicePayload[];
  devices: Device[];
  getDevices: () => void;
  addDevice: (deviceId: string) => void;
  updateDevices: (device: Device) => void;
  setFocusedDevice: (device: Device) => void;
  getDevice: (deviceId: string) => Promise<Device | undefined>;
  changeDeviceStatus: (deviceId: string, status: DeviceStatusType) => void;
  updateFocusedDevice: (status: DeviceStatusType) => void;
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

  updateFocusedDevice: (status) => {
    set((state) => {
      if (state.focusedDevice === null) {
        return state;
      }

      // 🌟 CORRECTED: Spread the OLD properties first, then apply the NEW properties
      const updatedFocusedDevice = {
        ...state.focusedDevice, // Spread all existing properties (including the old status)
        status, // Overwrite the 'status' property with the NEW value
      };

      // Since you are using Zustand, returning a Partial<StoreState> is the standard practice.
      return { focusedDevice: updatedFocusedDevice };
    });
  },

  getDevice: async (deviceId) => {
    try {
      const res = await fetch(`${BASE_URL}device/${deviceId}`, {
        method: "GET",
      });

      const data = await res.json();
      if (res.ok) {
        return data;
      }

      return undefined;
    } catch (error) {
      console.log(error);
    }
  },
  changeDeviceStatus: (deviceId, status) => {
    set((state) => {
      const updatedDevices = state.devices.map(
        (device) =>
          device.deviceId === deviceId
            ? { ...device, status } // If match: return a NEW object with all old properties and the updated 'status'.
            : device // If no match: return the original object.
      );
      // The 'set' function expects the new state, which is { devices: updatedDevices }
      // if you're updating a top-level property of the state object.
      return { ...state, devices: updatedDevices };
    });
  },
}));
