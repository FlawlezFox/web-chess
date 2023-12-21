import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-pawn-black.svg";
import icon from "../../assets/svg/icon-pawn.svg";
import { Board } from "../Board";

export class Pawn extends Figure {
    isFirstMove: boolean = true;

    constructor(color: Colors, isFirstMove?: boolean) {
        super(color);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.PAWN;

        if (isFirstMove === false) {
            this.isFirstMove = isFirstMove;
        }
    }

    moveFigure(target: Cell, board: Board): void {
        super.moveFigure(target, board);

        this.isFirstMove = false;
    }
}