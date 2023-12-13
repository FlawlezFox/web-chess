import { useEffect, useState } from "react";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";
import { getUser } from "../../common/service/userS";
import { useParams } from "react-router-dom";

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
import { socket } from "../../common/service/gameS";

const PageGame = () => {
    const { playerId } = useParams();

    const [board, setBoard] = useState<Board>(new Board);

    const [whitePlayer, setWhitePlayer] = useState<Player | null>(null);
    const [blackPlayer, setBlackPlayer] = useState<Player | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    // updating board as the game starts
    useEffect(() => {
        restart();
        
        // TODO: handle this error properly
        if (!playerId) {
            console.log("Произошла ошибка!");
            return;
        }

        // get the player and set him as current player
        getUser(playerId).then(player => {
            setPlayers(player);
        }).catch(error => {
            console.log(error);
        });

        // in this event we're getting other player's data
        socket.on("gameStarted", (player) => {
            console.log("GAME STARTED");

            setPlayers(player);
        });

    }, [playerId]);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    function setPlayers(player: Player) {
        if (player.color === Colors.WHITE) {
            setWhitePlayer(player);
            setCurrentPlayer(player);
        } else {
            setBlackPlayer(player);
        }
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
                        ? <span className={styles.userName}>{whitePlayer?.name || "Игрок не подключен"} (белые)</span>
                        : <span className={styles.userName}>{blackPlayer?.name || "Игрок не подключен"} (черные)</span>
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