import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-rook-black.svg";
import icon from "../../assets/svg/icon-rook.svg";

export class Rook extends Figure {
    constructor(color: Colors) {
        super(color);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.ROOK;
    }
}