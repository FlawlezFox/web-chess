import { nanoid } from "nanoid";
import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";
import { Bishop } from "./figures/Bishop";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { King } from "./figures/King";

export class Cell {
    readonly x: string; // symbol-coordinate (e.g. a, b, c ...)
    readonly y: number; // number-coordinate (e.g. 0, 1 ,2 ...)
    readonly color: Colors;

    figure: Figure | null;
    available: boolean; // available for move

    id: string; // nano id key

    constructor(x: string, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.available = false;
        this.id = nanoid();
    }

    addMove(target: Cell, board: Board) {
        board.moves.push({
            color: this.figure?.color,
            move: target.x + (target.y + 1),
            figure: target.figure
        })
    }

    moveFigure(target: Cell, board: Board) {
        if (this.figure && this.canMove(target, board)) {
            this.figure.moveFigure(target, board);

            this.addMove(target, board);

            target.setFigure(this.figure);
            this.figure = null;
        }
    }

    setFigure(figure: Figure | null) {
        this.figure = figure;
    }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            return target.figure !== null && this.figure !== null && this.figure.color !== target.figure.color;
        }

        return false;
    }

    isEmpty() {
        return this.figure === null;
    }

    isEmptyVertical(target: Cell, board: Board): boolean {
        if (this.x !== target.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!board.getCell(this.getNumericXCoordinate(this.x, board), y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyHorizontal(target: Cell, board: Board): boolean {
        if (this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.getNumericXCoordinate(this.x, board), this.getNumericXCoordinate(target.x, board));
        const max = Math.max(this.getNumericXCoordinate(this.x, board), this.getNumericXCoordinate(target.x, board));

        for (let x = min + 1; x < max; x++) {
            if (!board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyDiagonal(target: Cell, board: Board): boolean {
        const absX = Math.abs(this.getNumericXCoordinate(target.x, board) - this.getNumericXCoordinate(this.x, board));
        const absY = Math.abs(this.y - target.y);

        if (absX !== absY) {
            return false;
        }

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.getNumericXCoordinate(this.x, board) < this.getNumericXCoordinate(target.x, board) ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!board.getCell(this.getNumericXCoordinate(this.x, board) + dx * i, this.y + dy * i).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    canMove(target: Cell, board: Board): boolean {
        if (this.figure instanceof Bishop && !this.canBishopMove(target, board)) {
            return false;
        }

        if (this.figure instanceof King && !this.canKingMove(target, board)) {
            return false;
        }

        if (this.figure instanceof Knight && !this.canKnightMove(target, board)) {
            return false;
        }

        if (this.figure instanceof Pawn && !this.canPawnMove(target, board)) {
            return false
        }

        if (this.figure instanceof Queen && !this.canQueenMove(target, board)) {
            return false;
        }

        if (this.figure instanceof Rook && !this.canRookMove(target, board)) {
            return false;
        }

        return true;
    }

    canBishopMove(target: Cell, board: Board): boolean {
        if (!this.figure?.canMove(target)) {
            return false;
        }

        if (this.isEmptyDiagonal(target, board)) {
            return true;
        }

        return false;
    }

    canKingMove(target: Cell, board: Board): boolean {
        if (!this.figure?.canMove(target)) {
            return false;
        }

        for (const row of board.cells) {
            for (const cell of row) {
                if (cell.figure && cell.figure.color !== this.figure.color) {
                    if (cell.figure.name !== FigureNames.PAWN && cell.figure.name !== FigureNames.KING && cell.canMove(target, board)) {
                        return false;
                    } else if (cell.figure.name === FigureNames.PAWN && cell.canPawnEat(target, board)) {
                        return false;
                    }
                }
            }
        }

        if ((target.y === this.y + 1 || target.y === this.y - 1) && this.isEmptyVertical(target, board)) {
            return true;
        }

        if ((this.getNumericXCoordinate(target.x, board) === this.getNumericXCoordinate(this.x, board) + 1
            || this.getNumericXCoordinate(target.x, board) === this.getNumericXCoordinate(this.x, board) - 1)
            && this.isEmptyHorizontal(target, board)) {
            return true;
        }

        if ((this.getNumericXCoordinate(target.x, board) === this.getNumericXCoordinate(this.x, board) + 1
            || this.getNumericXCoordinate(target.x, board) === this.getNumericXCoordinate(this.x, board) - 1)
            && (target.y === this.y + 1 || target.y === this.y - 1)
            && this.isEmptyDiagonal(target, board)) {
            return true;
        }

        return false;
    }

    canKnightMove(target: Cell, board: Board): boolean {
        if (!this.figure?.canMove(target)) {
            return false;
        }

        const dx = Math.abs(this.getNumericXCoordinate(this.x, board) - this.getNumericXCoordinate(target.x, board))
        const dy = Math.abs(this.y - target.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }

    canPawnMove(target: Cell, board: Board): boolean {
        const direction = this.figure?.color === Colors.BLACK ? 1 : -1;
        const firstMoveDirection = this.figure?.color === Colors.BLACK ? 2 : -2;

        if (!this.figure?.canMove(target)) {
            return false;
        }

        /* MAKING MOVE
        * making sure that figure doesn't go as far as 1 cell
        * or if this a first move then check if figure can go as far as 2 cells
        * then make sure that figure doesn't go horizontally
        * then check if there's no same colored figures in the way
        */
        if ((target.y === this.y + direction || ((this.figure as Pawn).isFirstMove
            && (target.y === this.y + firstMoveDirection)))
            && target.x === this.x
            && board.getCell(this.getNumericXCoordinate(target.x, board), target.y).isEmpty()) {
            return true;
        }

        /* EATING FIGURE
        * making sure that figure doesn't go as far as 1 cell
        * and can go horizontally right
        * or left
        * and checking if there's is an enemy here
        */
        if (target.y === this.y + direction
            && (this.getNumericXCoordinate(target.x, board) === this.getNumericXCoordinate(this.x, board) + 1
            || this.getNumericXCoordinate(target.x, board) === this.getNumericXCoordinate(this.x, board) - 1)
            && this.isEnemy(target)) {
            return true;
        }

        return false;
    }

    canPawnEat(target: Cell, board: Board): boolean {
        const direction = this.figure?.color === Colors.BLACK ? 1 : -1;

        return target.y === this.y + direction
            && (this.getNumericXCoordinate(target.x, board) === this.getNumericXCoordinate(this.x, board) + 1
            || this.getNumericXCoordinate(target.x, board) === this.getNumericXCoordinate(this.x, board) - 1)
    }

    canQueenMove(target: Cell, board: Board): boolean {
        if (!this.figure?.canMove(target)) {
            return false;
        }

        if (this.isEmptyVertical(target, board)) { 
            return true; 
        }

        if (this.isEmptyHorizontal(target, board)) { 
            return true; 
        }

        if (this.isEmptyDiagonal(target, board)) { 
            return true; 
        }

        return false;
    }

    canRookMove(target: Cell, board: Board): boolean {
        if (!this.figure?.canMove(target)) {
            return false;
        }

        if (this.isEmptyVertical(target, board)) {
            return true;
        }

        if (this.isEmptyHorizontal(target, board)) {
            return true;
        }

        return false;
    }

    public getNumericXCoordinate(x: string, board: Board): number {
        return board.rowCoordinate.indexOf(x);
    }
}