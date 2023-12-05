import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-pawn-black.svg";
import icon from "../../assets/svg/icon-pawn.svg";

export class Pawn extends Figure {
    isFirstMove: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }

        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        const firstMoveDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

        /* MAKING MOVE
        * making sure that figure doesn't go as far as 1 cell
        * or if this a first move then check if figure can go as far as 2 cells
        * then make sure that figure doesn't go horizontally
        * then check if there's no same colored figures in the way
        */
        if ((target.y === this.cell.y + direction || this.isFirstMove
            && (target.y === this.cell.y + firstMoveDirection))
            && target.x === this.cell.x
            && this.cell.board.getCell(this.cell.getNumericXCoordinate(target.x), target.y).isEmpty()) {
                return true;
        }

        /* EATING FIGURE
        * making sure that figure doesn't go as far as 1 cell
        * and can go horizontally right
        * or left
        * and checking if there's is an enemy here
        */
        if (target.y === this.cell.y + direction
            && (this.cell.getNumericXCoordinate(target.x) === this.cell.getNumericXCoordinate(this.cell.x) + 1 
            || this.cell.getNumericXCoordinate(target.x) === this.cell.getNumericXCoordinate(this.cell.x) - 1)
            && this.cell.isEnemy(target)) {
                return true;
        }

        return false;
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);

        this.isFirstMove = false;
    }
}