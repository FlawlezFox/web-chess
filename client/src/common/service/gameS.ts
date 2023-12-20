import io from "socket.io-client";
import { Player } from "../../models/Player";
import { Board } from "../../models/Board";

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

export function playerGivesUp(player: Player | null) {
    socket.emit("playerGivesUp", player);
}

export function playerSendDrawRequest(player: Player | null) {
    socket.emit("playerSendDrawRequest", player);
}

export function playerConfirmDraw(player: Player | null) {
    socket.emit("playerConfirmDraw", player);
}

export function playerRejectedDraw(player: Player | null) {
    socket.emit("playerRejectedDraw", player);
}

export function playerMoved(board: Board) {
    const boardProps = {
        cells: board.cells,
        moves: board.moves,
    };
    socket.emit("playerMoved", JSON.stringify(boardProps));
}

export function reconnect() {
    socket.disconnect();
    socket.connect();
}