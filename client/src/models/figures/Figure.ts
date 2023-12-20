import { Colors } from "../Colors";
import icon from "../../assets/svg/icon-pawn.svg"
import { Cell } from "../Cell";
import { nanoid } from "nanoid";
import { Board } from "../Board";

export enum FigureNames {
    FIGURE = "Фигура",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    BISHOP = "Слон",
}

export class Figure {
    color: Colors;
    icon: typeof icon | null;
    name: FigureNames;
    id: string;

    constructor(color: Colors) {
        this.color = color;
        this.icon = null;
        this.name = FigureNames.FIGURE;
        this.id = nanoid();
    }

    canMove(target: Cell) : boolean {
        if (target.figure?.color === this.color) {
            return false
        }

        if (target.figure?.name === FigureNames.KING) {
            return false;
        }

        return true;
    }

    moveFigure(target: Cell, board: Board) {

    }
}