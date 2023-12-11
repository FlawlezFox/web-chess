import io from "socket.io-client";
import { Player } from "../../models/Player";

const SERVER = import.meta.env.VITE_BACKEND_SERVER;

const socket = io(SERVER);

export function createNewGame(player: Player | undefined) {
    socket.emit("createNewGame", player);
}

export function reconnect() {
    socket.disconnect();
    socket.connect();
}