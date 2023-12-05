import { nanoid } from "nanoid";
import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: string; // symbol-coordinate (e.g. a, b, c ...)
    readonly y: number; // number-coordinate (e.g. 0, 1 ,2 ...)
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

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            target.setFigure(this.figure);
            this.figure = null;
        }
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            return this.figure?.color !== target.figure.color;
        }

        return false;
    }

    isEmpty() {
        return this.figure === null;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.getNumericXCoordinate(this.x), y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.getNumericXCoordinate(this.x), this.getNumericXCoordinate(target.x));
        const max = Math.max(this.getNumericXCoordinate(this.x), this.getNumericXCoordinate(target.x));

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(this.getNumericXCoordinate(target.x) - this.getNumericXCoordinate(this.x));
        const absY = Math.abs(this.y - target.y);

        if (absX !== absY) {
            return false;
        }

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.getNumericXCoordinate(this.x) < this.getNumericXCoordinate(target.x) ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.getNumericXCoordinate(this.x) + dx*i, this.y + dy*i).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    public getNumericXCoordinate(x: string): number {
        return this.board.rowCoordinate.indexOf(x);
    }
}