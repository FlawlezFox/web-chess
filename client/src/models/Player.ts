import { nanoid } from "nanoid";
import { Colors } from "./Colors";

export class Player {
    id: string;
    name: string;
    color: Colors;

    constructor(name: string, color: Colors) {
        this.id = nanoid(); // generating unique id
        this.name = name;
        this.color = color;
    }
}