import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-bishop-black.svg?react";
import icon from "../../assets/svg/icon-bishop.svg?react";

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.BISHOP;
    }
}