import { Colors } from "../../models/Colors";
import { Figure } from "../../models/figures/Figure";

interface IMove {
    color: Colors | undefined;
    move: string;
    figure: Figure | null;
}

export default IMove;