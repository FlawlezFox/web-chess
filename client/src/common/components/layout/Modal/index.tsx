import IModal from "../../../interfaces/IModal";
import { FormEvent, useEffect, useState } from "react";
import { createNewGame, socket, playerConnects, reconnect, startGame } from "../../../service/gameS";
import { Player } from "../../../../models/Player";

// components
import Button from "../../ui/Button/index";
import Input from "../../ui/Input/index";
import IconCross from "../../../../assets/svg/icon-cross.svg?react";

// styles
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";


const Modal = ({ mode, player }: IModal) => {
    return (
        <dialog id="modalWindow" className={styles.modalWindow}>
            {
                mode === "Join"
                    ? <ModalJoin
                        mode={mode}
                        player={player}
                    />
                    : <ModalInvite
                        mode={mode}
                        player={player}
                    />
            }
        </dialog>
    );
}

const ModalJoin = ({mode, player}: IModal) => {
    const [gameId, setGameId] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(!player) {
            return;
        }

        player.gameId = gameId;

        playerConnects(player);

        setErrorMessage("");

        socket.on("error", (message) => {
            setErrorMessage(message);
            return;
        });

        // emiting event for the first player
        startGame(player);

        // TODO: HANDLE ERRORs !!!!!!!!!!!!!!!!!
        navigate(`/game/${player.id}`);
    }

    return (
        <>
            <div className={styles.modalHeader}>
                <div className={styles.heading}>Вход в игру</div>

                <button className={styles.crossButton} onClick={closeModal}>
                    <IconCross className={styles.iconCross} />
                </button>
            </div>

            <form
                action=""
                onSubmit={(event) => handleOnSubmit(event)}
                className={styles.joinForm}
            >
                <Input
                    className="inputCode"
                    label="Введите код игры:"
                    errorMessage={errorMessage}
                    onChange={(event) => setGameId(event.target.value)}
                />

                <Button
                    color="Blue"
                    label="Войти в игру"
                    // isLink={true}
                    // to="/game"
                />
            </form>
        </>
    );
}

const ModalInvite = ({mode, player}: IModal) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [waitMessage, setWaitMessage] = useState<string>("Ожидание подключения второго игрока...");

    const navigate = useNavigate();

    useEffect(() => {
        createNewGame(player);
    }, [player]);

    /** Listening to the event until second player is connected
     *  after connection remove the listener
     */
    useEffect(() => {
        socket.on("playerConnected", (secondPlayer) => {
            setWaitMessage(`Второй игрок ${secondPlayer.name} подключился, переход в игру...`);

            if (!player) {
                setWaitMessage("Возникла ошибка, авторизуйтесь снова");
                return;
            }

            // emiting event for the second player
            startGame(player);

            navigate(`/game/${player.id}`); // navigating player to the room, saving his unique id in the url
        });

        return () => {
            socket.off("playerConnected");
        }
    }, [player, navigate]);

    function copyCode() {
        if (player?.gameId) {
            navigator.clipboard.writeText(player.gameId);
            setIsClicked(true);
        }
        console.log(player?.gameId);
    }

    function handleCloseModal() {
        /** After the modal closed by the user
         *  we have to disconnect user from the room
         *  and reconnect again so he won't wait for the player to join
         *  the room with the old game ID
         **/ 
        closeModal();
        player = undefined;
        reconnect();
        setIsClicked(false);
        setWaitMessage("Ожидание подключения второго игрока...");
    }

    return (
        <>
            <div className={styles.modalHeader}>
                <div className={styles.heading}>Создание игры</div>

                <button className={styles.crossButton} onClick={handleCloseModal}>
                    <IconCross className={styles.iconCross} />
                </button>
            </div>

            <div className={styles.inviteContainer}>
                <div className={styles.codeLabel}>Комната доступна по коду: </div>

                <div className={styles.codeContainer}>
                    <span className={styles.code}>{player?.gameId || "Код не был сгенерирован"}</span>
                    <Button
                        color="Blue"
                        label={isClicked ? "Код скопирован" : "Скопировать код"}
                        onClick={copyCode}
                    />
                </div>
            </div>

            <div className={styles.waitMessage}>{waitMessage}</div>
        </>
    );
}

function closeModal() {
    const modal: HTMLElement | null = document.getElementById("modalWindow");

    if (modal !== null && modal instanceof HTMLDialogElement) {
        modal.close();
    }
}

export default Modal;