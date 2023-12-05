import { Fragment, useEffect, useState } from "react";
import IBoard from "../../../interfaces/IBoard";
import { Cell } from "../../../../models/Cell";

// components
import CellComponent from "../CellComponent";

// styles
import styles from "./index.module.css";

const BoardComponent = ({ board, setBoard, currentPlayer, swapPlayer }: IBoard) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function select(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    // when cell selected hightlight other cells and update the board
    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard()
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