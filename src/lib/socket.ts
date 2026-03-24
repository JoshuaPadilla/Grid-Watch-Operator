import { io } from "socket.io-client";
import { SOCKET_URL } from "../constants/base_url.constant";

const socketUrl = import.meta.env.VITE_SOCKET_URL || new URL(SOCKET_URL).origin;
const rawPath = new URL(SOCKET_URL).pathname;
const socketPath =
	import.meta.env.VITE_SOCKET_PATH ||
	(rawPath && rawPath !== "/" ? rawPath : "/socket.io");

const socket = io(socketUrl, {
	path: socketPath,
	autoConnect: false,
	reconnection: true,
	reconnectionAttempts: 10,
	reconnectionDelay: 1000,
	transports: ["websocket", "polling"],
});

socket.on("connect_error", (error) => {
	console.error("Socket connect_error:", error.message);
});

socket.on("connect", () => {
	console.log("Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
	console.log("Socket disconnected:", reason);
});

export default socket;
