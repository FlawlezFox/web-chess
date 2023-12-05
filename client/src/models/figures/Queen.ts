import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-queen-black.svg";
import icon from "../../assets/svg/icon-queen.svg";

export class Queen extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }

        if (this.cell.isEmptyVertical(target)) {
            return true;
        }

        if (this.cell.isEmptyHorizontal(target)) {
            return true;
        }

        if (this.cell.isEmptyDiagonal(target)) {
            return true;
        }

        return false;
    }
}