import { Fragment, useEffect, useState } from "react";
import IBoard from "../../../interfaces/IBoard";
import { Board } from "../../../../models/Board";
import { Cell } from "../../../../models/Cell";
import { playerMoved, socket } from "../../../service/gameS";
import IMove from "../../../interfaces/IMove";

// components
import CellComponent from "../CellComponent";

// styles
import styles from "./index.module.css";

const BoardComponent = ({ board, setBoard, currentPlayer, swapPlayer, yourPlayer }: IBoard) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function select(cell: Cell) {
        if (currentPlayer?.color === yourPlayer?.color) {
            if (selectedCell && selectedCell !== cell && selectedCell.canMove(cell, board)) {
                selectedCell.moveFigure(cell, board);
                swapPlayer();
                setSelectedCell(null);
                playerMoved(board);
            } else if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    // when cell selected hightlight other cells and update the board
    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    useEffect(() => {
        socket.on("playerMoved", (updatedBoard) => {
            type boardPropsT = {
                cells: Cell[][],
                moves: IMove[],
            }

            const boardProps: boardPropsT  = JSON.parse(updatedBoard);
            const newBoard = new Board(boardProps.cells, boardProps.moves);
            setBoard(newBoard);
            swapPlayer();
        });
    }, [currentPlayer]);

    function highlightCells() {
        if (board.highlightCells && typeof board.highlightCells === 'function') {
            board.highlightCells(selectedCell);
            updateBoard();
        }
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div className={styles.board}>
            {
                board.cells.map((row, id) =>
                    <Fragment key={id}>
                        {row.map((cell) =>
                            <CellComponent
                                select={select}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </Fragment>
                )
            }

        </div>
    );
}

export default BoardComponent;