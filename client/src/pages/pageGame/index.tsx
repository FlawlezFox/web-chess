import { useEffect, useState } from "react";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";
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

// styles
import styles from "./index.module.css";
import useMessage from "../../common/hooks/useMessage";

const PageGame = () => {
    const { playerId } = useParams();

    const [board, setBoard] = useState<Board>(new Board);

    const [whitePlayer, setWhitePlayer] = useState<Player | null>(null);
    const [blackPlayer, setBlackPlayer] = useState<Player | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    const [yourColor, setYourColor] = useState<Colors>();

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

        getPlayers();
    }, []);

    useEffect(() => {
        socket.on('playerDisconnected', () => {
            console.log("Другой игрок покинул игру");
            // open window that tells other player about winner
            showMessage("win", `Игрок ${getYourPlayer().yourPlayer?.name} победил`, "Противник отключился", false);
        });

        socket.on("playerGaveUp", (player) => {
            console.log(`Игрок ${player.name} сдался!`);

            if (isYourPlayer(player)) {
                showMessage("win", `Игрок ${getYourPlayer().yourPlayer?.name} победил`, `Противник сдался`, false);
            } else {
                showMessage("win", `Игрок ${player.name} победил`, `Противник сдался`, false);
            }
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

        return () => {
            socket.off('playerDisconnected');
            socket.off('playerGaveUp');
            socket.off("playerSendDrawRequest");
            socket.off("playerConfirmDraw");
            socket.off("playerRejectedDraw");
            hideMessage();
        };
    }, []);

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
            setYourColor(yourPlayer.color);

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
        playerSendDrawRequest(getYourPlayer().yourPlayer);
        showMessage("draw", "Вы предложили ничью", "Ожидаем ответ оппонента...", true);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    function confirmGiveUp() {
        playerGivesUp(getYourPlayer().yourPlayer);
        setConfirmMode("closed");
        showMessage("win", `Игрок ${getYourPlayer().yourPlayer?.name} победил`, "Вы сдались", false);
    }

    function confirmDraw() {
        playerConfirmDraw(getYourPlayer().yourPlayer);
        setConfirmMode("closed");
        showMessage("draw", `Игра завершилась ничьей!`, "", false);
    }

    function rejectDraw() {
        setConfirmMode("closed");
        playerRejectedDraw(getYourPlayer().yourPlayer);
    }

    function getYourPlayer() {
        if (yourColor === whitePlayer?.color) {
            return {
                yourPlayer: whitePlayer,
                opponentPlayer: blackPlayer
            };
        } else {
            return {
                yourPlayer: blackPlayer,
                opponentPlayer: whitePlayer
            };
        }
    }

    function isYourPlayer(player: Player): boolean {
        return getYourPlayer().yourPlayer?.color === player?.color;
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
                                message={`Игрок ${getYourPlayer().opponentPlayer?.name} предлагает ничью`}
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
                        yourPlayer={getYourPlayer().yourPlayer}
                        swapPlayer={swapPlayer}
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