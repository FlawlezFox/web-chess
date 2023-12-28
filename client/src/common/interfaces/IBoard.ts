import { Board } from "../../models/Board";
import { Player } from "../../models/Player";

interface IBoard {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
    yourPlayer: Player | null;
    showMessage: (icon: "win" | "draw", messageText: string, descriptionText: string, wait: boolean) => void
}

export default IBoard;