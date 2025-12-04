import {
  DEVICE_STATUS,
  type DeviceStatusType,
} from "../../types/device_status.type";

export const getDeviceStatusColor = (status?: DeviceStatusType) => {
  switch (status) {
    case DEVICE_STATUS.NO_POWER:
      return "red";
    case DEVICE_STATUS.FLUCTUATING:
      return "yellow";
    case DEVICE_STATUS.STABLE:
      return "green";
    case DEVICE_STATUS.HIGH:
      return "yellow";
    case DEVICE_STATUS.LOW:
      return "yellow";
    default:
      return "red";
  }
};
