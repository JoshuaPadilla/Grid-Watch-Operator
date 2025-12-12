import {
  DEVICE_STATUS,
  type DeviceStatusType,
} from "../../types/device_status.type";

export const getDeviceStatusText = (status: DeviceStatusType) => {
  switch (status) {
    case DEVICE_STATUS.NO_POWER:
      return "No Power";
    case DEVICE_STATUS.FLUCTUATING:
      return "Fluctiating Power";
    case DEVICE_STATUS.STABLE:
      return "Stable";
    case DEVICE_STATUS.HIGH_VOLTAGE:
      return "High Voltage";
    case DEVICE_STATUS.CURRENT_OVERLOAD:
      return "Current Overloading";
    case DEVICE_STATUS.LOW:
      return "Low Power";
    default:
      return "No Power";
  }
};
