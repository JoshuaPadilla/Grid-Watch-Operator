import { io } from "socket.io-client";
import { BASE_URL } from "../constants/base_url.constant";
const socket = io(BASE_URL, {
  transports: ["websocket"], // improves compatibility
});

export default socket;
