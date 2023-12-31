import { Fragment, useEffect, useState } from "react";
import IBoard from "../../../interfaces/IBoard";
import { Board } from "../../../../models/Board";
import { Cell } from "../../../../models/Cell";
import { playerMoved, socket } from "../../../service/gameS";
import IMove from "../../../interfaces/IMove";
import { FigureNames } from "../../../../models/figures/Figure";
import { Colors } from "../../../../models/Colors";

// components
import CellComponent from "../CellComponent";

// styles
import styles from "./index.module.css";

const BoardComponent = ({ board, setBoard, currentPlayer, swapPlayer, yourPlayer, showMessage }: IBoard) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const [whiteKingIsCheck, setWhiteKingIsCheck] = useState<boolean>(false);
    const [blackKingIsCheck, setBlackKingIsCheck] = useState<boolean>(false);

    const [isWhiteKingCheckmated, setIsWhiteKingCheckmated] = useState<boolean>(false);
    const [isBlackKingCheckmated, setIsBlackKingCheckmated] = useState<boolean>(false);

    const [isWhiteKingStalemated, setIsWhiteKingStalemated] = useState<boolean>(false);
    const [isBlackKingStalemated, setIsBlackKingStalemated] = useState<boolean>(false);

    function select(cell: Cell) {
        if (currentPlayer?.color === yourPlayer?.color) {
            if (selectedCell && selectedCell !== cell && selectedCell.canMove(cell, board) && cell.figure?.name !== FigureNames.KING) {
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
        setWhiteKingIsCheck(board.isCheck(Colors.WHITE));
        setBlackKingIsCheck(board.isCheck(Colors.BLACK));

        setIsWhiteKingCheckmated(board.isCheckmate(Colors.WHITE));
        setIsBlackKingCheckmated(board.isCheckmate(Colors.BLACK));

        setIsWhiteKingStalemated(board.isStalemate(Colors.WHITE));
        setIsBlackKingStalemated(board.isStalemate(Colors.BLACK));

        if (isWhiteKingCheckmated) {
            socket.emit("whiteKingCheckmated", "Черные победили матом");
            showMessage("win", `Игрок ${yourPlayer?.name} победил`, "Черные победили матом", false);
        }

        if (isBlackKingCheckmated) {
            socket.emit("blackKingCheckmated", "Белые победили матом");
            showMessage("win", `Игрок ${yourPlayer?.name} победил`, "Белые победили матом", false);
        }

        if (isWhiteKingStalemated) {
            socket.emit("whiteKingStalemated", "Патовая ситуация");
            showMessage("draw", `Игра завершилась ничьей`, "Патовая ситуация", false);
        }

        if (isBlackKingStalemated) {
            socket.emit("blackKingStalemated", "Патовая ситуация");
            showMessage("draw", `Игра завершилась ничьей`, "Патовая ситуация", false);
        }

        console.log(`White king isCheck: ${whiteKingIsCheck}\nBlack king isCheck: ${blackKingIsCheck}`);

        console.log(`White king isCheckmated: ${isWhiteKingCheckmated}\nBlack king isCheckmated: ${isBlackKingCheckmated}`);

        console.log(`White king isStalemated: ${isWhiteKingStalemated}\nBlack king isStalemated: ${isBlackKingStalemated}`);
    }, [board, currentPlayer]);

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
    }, [board, currentPlayer]);

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
                                whiteKingIsCheck={whiteKingIsCheck}
                                blackKingIsCheck={blackKingIsCheck}
                            />
                        )}
                    </Fragment>
                )
            }

        </div>
    );
}

export default BoardComponent;