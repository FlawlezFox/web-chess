import io from "socket.io-client";
import { Player } from "../../models/Player";

const SERVER = import.meta.env.VITE_BACKEND_SERVER;

export const socket = io(SERVER);

export function createNewGame(player: Player | undefined) {
    socket.emit("createNewGame", player);
}

export function playerConnects(player: Player | undefined) {
    socket.emit("playerConnects", player);
}

export function sendDataToSecondPlayer(player: Player | null) {
    socket.emit("sendDataToSecondPlayer", player);
}

export function playerLeftGamePage() {
    socket.emit("playerLeftGamePage");
}

export function reconnect() {
    socket.disconnect();
    socket.connect();
}