import { Cell } from "../../models/Cell";

interface ICell {
    cell: Cell;
    selected: boolean;
    select: (cell: Cell) => void;
}

export default ICell;