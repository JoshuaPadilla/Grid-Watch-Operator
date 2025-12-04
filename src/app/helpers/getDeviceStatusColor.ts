import {
  DEVICE_STATUS,
  type DeviceStatusType,
} from "../../types/device_status.type";

export const getDeviceStatusColor = (status?: DeviceStatusType) => {
  switch (status) {
    case DEVICE_STATUS.NO_POWER:
      return "#ff6467";
    case DEVICE_STATUS.FLUCTUATING:
      return "#fdc700";
    case DEVICE_STATUS.STABLE:
      return "#05df72";
    case DEVICE_STATUS.HIGH:
      return "#fdc700";
    case DEVICE_STATUS.LOW:
      return "#fdc700";
    default:
      return "#ff6467";
  }
};
