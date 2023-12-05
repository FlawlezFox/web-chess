import { Board } from "../../models/Board";
import { Player } from "../../models/Player";

interface IBoard {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

export default IBoard;