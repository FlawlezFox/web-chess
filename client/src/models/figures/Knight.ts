import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-knight-black.svg?react";
import icon from "../../assets/svg/icon-knight.svg?react";

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.KNIGHT;
    }
}