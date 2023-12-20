import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-queen-black.svg";
import icon from "../../assets/svg/icon-queen.svg";

export class Queen extends Figure {

    constructor(color: Colors) {
        super(color);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.QUEEN;
    }
}