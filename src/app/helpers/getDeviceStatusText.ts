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
    case DEVICE_STATUS.HIGH:
      return "High Power";
    case DEVICE_STATUS.LOW:
      return "Low Power";
    default:
      return "No Power";
  }
};
