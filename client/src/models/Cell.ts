import { nanoid } from "nanoid";
import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: string; // number-coordinate (e.g. 1, 2 ,3 ...)
    readonly y: number; // symbol-coordinate (e.g. a, b, c ...)
    readonly color: Colors;

    figure: Figure | null;
    board: Board;
    available: boolean; // available for move

    id: string; // nano id key
    
    constructor(board: Board, x: string, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = nanoid();
    }
}