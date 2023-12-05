import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-king-black.svg";
import icon from "../../assets/svg/icon-king.svg";

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }

        if ((target.y === this.cell.y + 1 || target.y === this.cell.y - 1) && this.cell.isEmptyVertical(target)) {
            return true;
        }

        if ((this.cell.getNumericXCoordinate(target.x) === this.cell.getNumericXCoordinate(this.cell.x) + 1
            || this.cell.getNumericXCoordinate(target.x) === this.cell.getNumericXCoordinate(this.cell.x) - 1)
            && this.cell.isEmptyHorizontal(target)) {
            return true;
        }

        if ((this.cell.getNumericXCoordinate(target.x) === this.cell.getNumericXCoordinate(this.cell.x) + 1
            || this.cell.getNumericXCoordinate(target.x) === this.cell.getNumericXCoordinate(this.cell.x) - 1)
            && (target.y === this.cell.y + 1 || target.y === this.cell.y - 1)
            && this.cell.isEmptyDiagonal(target)) {
            return true;
        }

        return false;
    }
}