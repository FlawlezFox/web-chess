import { useEffect, useState } from "react";

// components
import IconChessBoard from "../../assets/svg/icon-chess-board.svg?react";
import IconProfile from "../../assets/svg/icon-profile.svg?react";
import BoardComponent from "../../common/components/layout/BoardComponent";
import HistoryPanel from "../../common/components/layout/HistoryPanel";

// models
import { Board } from "../../models/Board";

// styles
import styles from "./index.module.css";

const PageGame = () => {
    const [board, setBoard] = useState<Board>(new Board);

    // updating board as the game starts
    useEffect(() => {
        restart();
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        setBoard(newBoard);
    }

    return (
        <div className="page-wrapper">
            <div className={styles.gameTitle}>
                <IconChessBoard />
                <h1 className={styles.header}>Шахматный гений</h1>
            </div>

            <div className={styles.gameInfo}>
                <div className={styles.userInfo}>
                    <IconProfile />
                    <span className={styles.userName}>User12345</span>
                </div>

                <div className={styles.timer}>
                    Время на ход: <span className={styles.timeLeft}>1:00</span>
                </div>
            </div>

            <div className={styles.gameContainer}>
                <BoardComponent
                    board={board}
                    setBoard={setBoard}
                />
                
                <HistoryPanel />
            </div>
        </div>
    ); 
}

export default PageGame;