import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import iconBlack from "../../assets/svg/icon-bishop-black.svg";
import icon from "../../assets/svg/icon-bishop.svg";

export class Bishop extends Figure {
    constructor(color: Colors) {
        super(color);

        this.icon = color === Colors.BLACK ? iconBlack : icon;
        this.name = FigureNames.BISHOP;
    }
}