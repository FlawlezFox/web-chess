import IMove from "../common/interfaces/IMove";
import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
    cells: Cell[][] = [];
    rowCoordinate: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    moves: IMove[] = [];

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (const j of this.rowCoordinate) {
                if ((i + this.rowCoordinate.indexOf(j)) % 2 !== 0) {
                    row.push(new Cell(j, i, Colors.BLACK, null));
                } else {
                    row.push(new Cell(j, i, Colors.WHITE, null));
                }
            }

            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            this.getCell(i, 1).figure = new Pawn(Colors.BLACK);
            this.getCell(i, 6).figure = new Pawn(Colors.WHITE);
        }
    }

    private addKings() {
        this.getCell(4, 0).figure = new King(Colors.BLACK);
        this.getCell(4, 7).figure = new King(Colors.WHITE);
    }

    private addQueens() {
        this.getCell(3, 0).figure = new Queen(Colors.BLACK);
        this.getCell(3, 7).figure = new Queen(Colors.WHITE);
    }

    private addBishops() {
        this.getCell(2, 0).figure = new Bishop(Colors.BLACK);
        this.getCell(5, 0).figure = new Bishop(Colors.BLACK);
        this.getCell(2, 7).figure = new Bishop(Colors.WHITE);
        this.getCell(5, 7).figure = new Bishop(Colors.WHITE);
    }

    private addKnights() {
        this.getCell(1, 0).figure = new Knight(Colors.BLACK);
        this.getCell(6, 0).figure = new Knight(Colors.BLACK);
        this.getCell(1, 7).figure = new Knight(Colors.WHITE);
        this.getCell(6, 7).figure = new Knight(Colors.WHITE);
        
    }

    private addRooks() {
        this.getCell(0, 0).figure = new Rook(Colors.BLACK);
        this.getCell(7, 0).figure = new Rook(Colors.BLACK);
        this.getCell(0, 7).figure = new Rook(Colors.WHITE);
        this.getCell(7, 7).figure = new Rook(Colors.WHITE);
    }

    public addFigures() {
        this.addBishops();
        this.addKings();
        this.addKnights();
        this.addPawns();
        this.addQueens();
        this.addRooks();
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.canMove(target, this); // !! - converting to bool
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.moves = this.moves;
        return newBoard;
    }
}