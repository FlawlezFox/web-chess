import IMove from "./IMove";

interface IHistory {
    moves: IMove[];
    showConfirmWindow: () => void;
    showDrawWindow: () => void;
}

export default IHistory;