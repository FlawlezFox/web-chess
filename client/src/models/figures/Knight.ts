import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-knight-black.svg";
import icon from "../../assets/svg/icon-knight.svg";

export class Knight extends Figure {
    constructor(color: Colors) {
        super(color);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.KNIGHT;
    }
}