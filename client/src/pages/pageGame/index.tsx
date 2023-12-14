import { useEffect, useState } from "react";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";
import { getUser } from "../../common/service/userS";
import { useParams } from "react-router-dom";
import { socket } from "../../common/service/gameS";

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
    const { playerId } = useParams();

    const [board, setBoard] = useState<Board>(new Board);

    const [whitePlayer, setWhitePlayer] = useState<Player | null>(null);
    const [blackPlayer, setBlackPlayer] = useState<Player | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    const [yourColor, setYourColor] = useState<Colors>();

    // updating board as the game starts
    useEffect(() => {
        restart();       

        // in this method we're getting our player
        getPlayers();

        // second player gets data of first player
        socket.on("getDataOfFirstPlayer", (player) => {
            console.log("First player: " + player.name);

            setWhitePlayer(player);
            setCurrentPlayer(player);
        });

        return () => {
            socket.off("getDataOffFirstPlayer");
        }
    }, []);

    async function getPlayers() {
        /** if you created the game 
         *  url will contain your id (first) and id of your opponent (second)
         *  that splited by '&' symbol
         */
        if (playerId?.includes("&")) {
            const firstAndSecondId = playerId.split("&");
            const firstId = firstAndSecondId[0];
            const secondId = firstAndSecondId[1];

            const firstPlayer: Player = await getUser(firstId);
            const secondPlayer: Player = await getUser(secondId);

            console.log("Your player: " + firstPlayer.name);
            setYourColor(firstPlayer.color);

            setWhitePlayer(firstPlayer);
            setCurrentPlayer(firstPlayer);
            setBlackPlayer(secondPlayer);
        } else if (playerId) {
            const secondPlayer: Player = await getUser(playerId);

            console.log("Your player: " + secondPlayer.name);
            setYourColor(secondPlayer.color);

            setBlackPlayer(secondPlayer);
        } else {
            console.log("No players was found!");
        }
    }

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
                            ? <span className={styles.userName}>{whitePlayer?.name || "Игрок не подключен"} ({whitePlayer?.color === yourColor && "ВЫ"} белые)</span>
                            : <span className={styles.userName}>{blackPlayer?.name || "Игрок не подключен"} ({blackPlayer?.color === yourColor && "ВЫ"} черные)</span>
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