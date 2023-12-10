import { Player } from "../../models/Player";

interface IModal {
    mode: "Join" | "Invite";
    player: Player | undefined;
}

export default IModal;