import { nanoid } from "nanoid";
import { Colors } from "./Colors";

export class Player {
    id: string;
    name: string;
    color: Colors;
    gameId?: string;

    constructor(name: string, color: Colors, gameId?: string) {
        this.id = nanoid(); // generating unique id
        this.name = name;
        this.color = color;
        this.gameId = gameId;
    }
}