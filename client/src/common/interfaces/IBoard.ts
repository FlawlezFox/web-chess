import { Board } from "../../models/Board";

interface IBoard {
    board: Board;
    setBoard: (board: Board) => void;
}

export default IBoard;