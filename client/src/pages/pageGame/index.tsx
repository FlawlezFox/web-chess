import { useEffect, useState } from "react";
import { getUser } from "../../common/service/userS";
import { useBlocker, useParams } from "react-router-dom";
import { playerConfirmDraw, playerGivesUp, playerLeftGamePage, playerRejectedDraw, playerSendDrawRequest, socket } from "../../common/service/gameS";

// components
import IconChessBoard from "../../assets/svg/icon-chess-board.svg?react";
import IconProfile from "../../assets/svg/icon-profile.svg?react";
import BoardComponent from "../../common/components/layout/BoardComponent";
import HistoryPanel from "../../common/components/layout/HistoryPanel";
import Timer from "../../common/components/layout/Timer";
import Confirm from "../../common/components/layout/Confirm";
import Message from "../../common/components/layout/Message";

// models
import { Board } from "../../models/Board";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";

// styles
import styles from "./index.module.css";
import useMessage from "../../common/hooks/useMessage";

const PageGame = () => {
    const { playerId } = useParams();

    const [board, setBoard] = useState<Board>(new Board);

    const [whitePlayer, setWhitePlayer] = useState<Player | null>(null);
    const [blackPlayer, setBlackPlayer] = useState<Player | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    const [yourPlayer, setYourPlayer] = useState<Player | null>(null);

    const [confirmMode, setConfirmMode] = useState<"giveup" | "draw" | "closed">("closed");

    const {
        isMessageOpen,
        message,
        description,
        messageIcon,
        isWaiting,
        showMessage,
        hideMessage
    } = useMessage();

    // block player from navigating thrugh pages after the game started
    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        return currentLocation.pathname !== nextLocation.pathname && isMessageOpen === false;
    });

    // updating board as the game starts
    useEffect(() => {
        restart();

        getPlayers().catch(() => {
            showMessage("draw", "Нет подключения к базе данных", "Попробуйте зайти позже", false);
        });
    }, []);

    useEffect(() => {
        socket.on('playerDisconnected', () => {
            console.log("Другой игрок покинул игру");
            // open window that tells other player about winner
            showMessage("win", `Игрок ${yourPlayer?.name} победил`, "Противник отключился", false);
        });

        socket.on("playerGaveUp", (player) => {
            console.log(`Игрок ${player.name} сдался!`);

            showMessage("win", `Игрок ${yourPlayer?.name} победил`, `Противник сдался`, false);
        });

        socket.on("playerSendDrawRequest", (player) => {
            console.log(`Игрок ${player.name} предлагает вам ничью!`);

            // open confirmation dialog for the player, that received draw request
            setConfirmMode("draw");
        });

        socket.on("playerConfirmDraw", (player) => {
            console.log(`Игрок ${player.name} принял предложение ничьи!\nИгра окончена`);

            hideMessage();
            showMessage("draw", "Игра завершилась ничьей!", "", false);
        });

        socket.on("playerRejectedDraw", (player) => {
            console.log(`Игрок ${player.name} отказался от предложения ничьи!\nИгра продолжается`);

            hideMessage();
        });

        socket.on("playerTimerExpired", (player) => {
            console.log(`Игрок ${player.name} проиграл, так как у него кончился таймер!`);

            showMessage("win", `Игрок ${yourPlayer?.name} победил`, "У противника кончился таймер", false);
        });

        socket.on("whiteKingCheckmated", (message) => {
            if (yourPlayer?.color === Colors.WHITE) {
                console.log(`Игрок ${yourPlayer.name} проиграл, так как ему поставили мат!`);

                showMessage("win", `Игрок ${blackPlayer?.name} победил`, message, false);
            }
        });

        socket.on("blackKingCheckmated", (message) => {
            if (yourPlayer?.color === Colors.BLACK) {
                console.log(`Игрок ${yourPlayer.name} проиграл, так как ему поставили мат!`);

                showMessage("win", `Игрок ${whitePlayer?.name} победил`, message, false);
            }
        });

        socket.on("whiteKingStalemated", (message) => {
            console.log(`патовая ситуация`);

            showMessage("draw", `Игра завершилась ничьей!`, message, false);
        });

        socket.on("blackKingStalemated", (message) => {
            console.log(`патовая ситуация`);

            showMessage("draw", `Игра завершилась ничьей!`, message, false);
        });


        return () => {
            socket.off('playerDisconnected');
            socket.off('playerGaveUp');
            socket.off("playerSendDrawRequest");
            socket.off("playerConfirmDraw");
            socket.off("playerRejectedDraw");
            socket.off("playerTimerExpired");
            socket.off("whiteKingCheckmated");
            socket.off("blackKingCheckmated");
            socket.off("whiteKingStalemated");
            socket.off("blackKingStalemated");
            hideMessage();
        };
    }, [yourPlayer]);

    useEffect(() => {
        const handleUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = ""; // For some browsers to show a confirmation dialog
        };

        window.addEventListener("beforeunload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, []);

    async function getPlayers() {
        /** if you created the game 
         *  url will contain your id (first) and id of your opponent (second)
         *  that splited by '&' symbol
         */
        if (playerId) {
            const firstAndSecondId = playerId.split("&");
            const yourId = firstAndSecondId[0];
            const opponentId = firstAndSecondId[1];

            const yourPlayer: Player = await getUser(yourId);
            const opponentPlayer: Player = await getUser(opponentId);

            console.log("Your player: " + yourPlayer.name);
            setYourPlayer(yourPlayer);

            if (yourPlayer.color === Colors.WHITE) {
                setWhitePlayer(yourPlayer);
                setCurrentPlayer(yourPlayer);
                setBlackPlayer(opponentPlayer);
            } else {
                setWhitePlayer(opponentPlayer);
                setCurrentPlayer(opponentPlayer);
                setBlackPlayer(yourPlayer);
            }
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

    function playerDrawRequest() {
        playerSendDrawRequest(yourPlayer);
        showMessage("draw", "Вы предложили ничью", "Ожидаем ответ оппонента...", true);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    function confirmGiveUp() {
        playerGivesUp(yourPlayer);
        setConfirmMode("closed");
        showMessage("win", `Игрок ${getOpponentPlayer()?.name} победил`, "Вы сдались", false);
    }

    function confirmDraw() {
        playerConfirmDraw(yourPlayer);
        setConfirmMode("closed");
        showMessage("draw", `Игра завершилась ничьей!`, "", false);
    }

    function rejectDraw() {
        setConfirmMode("closed");
        playerRejectedDraw(yourPlayer);
    }

    function getOpponentPlayer() {
        if (yourPlayer?.color === whitePlayer?.color) {
            return blackPlayer;
        } else {
            return whitePlayer;
        }
    }

    function isYourPlayer(player: Player): boolean {
        return yourPlayer?.color === player?.color;
    }

    return (
        <>
            {
                blocker.state === 'blocked' && isMessageOpen === false
                    ? <Confirm
                        message="Вы точно хотите покинуть игру?"
                        handleConfirm={() => {
                            playerLeftGamePage();
                            blocker.proceed && blocker.proceed();
                        }}
                        handleCancel={() => blocker.reset && blocker.reset()}
                        open={true}
                    />
                    : confirmMode === "giveup" && isMessageOpen === false
                        ? <Confirm
                            message="Вы точно хотите сдаться?"
                            handleConfirm={() => confirmGiveUp()}
                            handleCancel={() => setConfirmMode("closed")}
                            open={true}
                        />
                        : confirmMode === "draw" && isMessageOpen === false
                            ? <Confirm
                                message={`Игрок ${getOpponentPlayer()?.name} предлагает ничью`}
                                handleConfirm={() => confirmDraw()}
                                handleCancel={() => rejectDraw()}
                                open={true}
                            />
                            : null
            }

            {
                isMessageOpen ?
                    <Message
                        icon={messageIcon}
                        message={message}
                        description={description}
                        open={isMessageOpen}
                        wait={isWaiting}
                    />
                    : null
            }

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
                                ? <span className={styles.userName}>{whitePlayer?.name || "Игрок не подключен"} ({whitePlayer?.color === yourPlayer?.color && "ВЫ "}белые)</span>
                                : <span className={styles.userName}>{blackPlayer?.name || "Игрок не подключен"} ({blackPlayer?.color === yourPlayer?.color && "ВЫ "}черные)</span>
                        }
                    </div>

                    <Timer
                        currentPlayer={currentPlayer}
                        showMessage={showMessage}
                        opponentPlayer={getOpponentPlayer()}
                    />
                </div>

                <div className={styles.gameContainer}>
                    <BoardComponent
                        board={board}
                        setBoard={setBoard}
                        currentPlayer={currentPlayer}
                        yourPlayer={yourPlayer}
                        swapPlayer={swapPlayer}
                        showMessage={showMessage}
                    />

                    <HistoryPanel
                        moves={board.moves}
                        showConfirmWindow={() => setConfirmMode("giveup")}
                        showDrawWindow={() => playerDrawRequest()}
                    />
                </div>
            </div>
        </>
    );
}

export default PageGame;