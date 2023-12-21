import { Player } from "../../models/Player";

interface ITimer {
    currentPlayer: Player | null;
    opponentPlayer: Player | null;
    showMessage: (icon: "win" | "draw", messageText: string, descriptionText: string, wait: boolean) => void;
}

export default ITimer;