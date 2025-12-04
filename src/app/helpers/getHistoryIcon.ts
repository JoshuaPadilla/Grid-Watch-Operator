import { Icons } from "../../constants/icons.constant";
import {
  DEVICE_STATUS,
  type DeviceStatusType,
} from "../../types/device_status.type";
import {
  HISTORY_STATUS,
  type HISTORY_STATUS_TYPES,
} from "../../types/history_status";

export const getHistoryIcon = (status: HISTORY_STATUS_TYPES) => {
  switch (status) {
    case HISTORY_STATUS.NOTIF:
      return Icons.notif;
    case HISTORY_STATUS.OUTAGE:
      return Icons.outage;
    case HISTORY_STATUS.RESTORED:
      return Icons.restored;

    default:
      return Icons.notif;
  }
};
