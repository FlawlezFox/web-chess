import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-queen-black.svg?react";
import icon from "../../assets/svg/icon-queen.svg?react";

export class Queen extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.QUEEN;
    }
}