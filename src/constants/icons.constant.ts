import app_logo from "../assets/icons/grid-watch-logo.png";
import popup_danger from "../assets/icons/popup_danger.png";
import popup_safe from "../assets/icons/popup_safe.png";
import popup_warning from "../assets/icons/popup_warning.png";
import location from "../assets/icons/location_icon.png";
import notif from "../assets/icons/history_notif.png";
import outage from "../assets/icons/history_outage.png";
import restored from "../assets/icons/history_restored.png";
import search from "../assets/icons/search.png";
import insights_device from "../assets/icons/insights_device.png";
import insights_outage from "../assets/icons/insights_outage.png";
import insights_restored from "../assets/icons/insights_restored.png";
import insights_stable from "../assets/icons/insights_stable.png";

interface IconsState {
  app_logo: string;
  popup_danger: string;
  popup_warning: string;
  popup_safe: string;
  location: string;
  notif: string;
  outage: string;
  restored: string;
  search: string;
  insights_device: string;
  insights_outage: string;
  insights_restored: string;
  insights_stable: string;
}

export const Icons: IconsState = {
  app_logo,
  popup_danger,
  popup_warning,
  popup_safe,
  location,
  notif,
  outage,
  restored,
  search,
  insights_device,
  insights_outage,
  insights_restored,
  insights_stable,
};
