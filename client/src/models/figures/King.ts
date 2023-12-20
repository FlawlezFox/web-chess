import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-king-black.svg";
import icon from "../../assets/svg/icon-king.svg";

export class King extends Figure {
    constructor(color: Colors) {
        super(color);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.KING;
    }
}