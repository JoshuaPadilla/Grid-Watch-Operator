import {
  HISTORY_STATUS,
  type HISTORY_STATUS_TYPES,
} from "../../types/history_status";

export const getHistoryColor = (status: HISTORY_STATUS_TYPES) => {
  switch (status) {
    case HISTORY_STATUS.NOTIF:
      return "#fdc700";
    case HISTORY_STATUS.OUTAGE:
      return "#ff6467";
    case HISTORY_STATUS.RESTORED:
      return "#05df72";
    default:
      return "#fdc700";
  }
};
