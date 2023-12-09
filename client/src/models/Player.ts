import { Colors } from "./Colors";

export class Player {
    name: string;
    color: Colors;

    constructor(name: string, color: Colors) {
        this.name = name;
        this.color = color;
    }
}