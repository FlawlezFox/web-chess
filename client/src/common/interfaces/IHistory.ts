import IMove from "./IMove";

interface IHistory {
    moves: IMove[];
    showConfirmWindow: () => void;
}

export default IHistory;