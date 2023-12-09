import { useEffect, useState } from "react";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";

// components
import IconChessBoard from "../../assets/svg/icon-chess-board.svg?react";
import IconProfile from "../../assets/svg/icon-profile.svg?react";
import BoardComponent from "../../common/components/layout/BoardComponent";
import HistoryPanel from "../../common/components/layout/HistoryPanel";
import Timer from "../../common/components/layout/Timer";

// models
import { Board } from "../../models/Board";

// styles
import styles from "./index.module.css";

const PageGame = () => {
    const [board, setBoard] = useState<Board>(new Board);

    const [whitePlayer, ] = useState<Player>(new Player("Cool_name1", Colors.WHITE));
    const [blackPlayer, ] = useState<Player>(new Player("bestPlayer12", Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    // updating board as the game starts
    useEffect(() => {
        restart();
        // TODO: make logic to randomly give players their figures color
        setCurrentPlayer(whitePlayer);
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.gameTitle}>
                <IconChessBoard className={styles.iconChessBoard} />
                <h1 className={styles.header}>Шахматный гений</h1>
            </div>

            <div className={styles.gameInfo}>
                <div className={styles.userInfo}>
                    <IconProfile className={styles.iconProfile} />
                    {
                        currentPlayer?.color === Colors.WHITE 
                        ? <span className={styles.userName}>{whitePlayer.name} (белые)</span>
                        : <span className={styles.userName}>{blackPlayer.name} (черные)</span>
                    }
                </div>

                <Timer
                    currentPlayer={currentPlayer}
                />
            </div>

            <div className={styles.gameContainer}>
                <BoardComponent
                    board={board}
                    setBoard={setBoard}
                    currentPlayer={currentPlayer}
                    swapPlayer={swapPlayer}
                />
                
                <HistoryPanel
                    moves={board.moves}
                />
            </div>
        </div>
    ); 
}

export default PageGame;