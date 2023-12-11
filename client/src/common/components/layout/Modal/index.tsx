import IModal from "../../../interfaces/IModal";
import { FormEvent, useEffect, useState } from "react";
import { createNewGame, playerConnects, reconnect } from "../../../service/gameS";

// components
import Button from "../../ui/Button/index";
import Input from "../../ui/Input/index";
import IconCross from "../../../../assets/svg/icon-cross.svg?react";

// styles
import styles from "./index.module.css";

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

    function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(!player) {
            return;
        }

        player.gameId = gameId;

        console.log(player.gameId);

        playerConnects(player);
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

    useEffect(() => {
        createNewGame(player);
    }, [player]);

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

            <div className={styles.waitMessage}>Ожидание подключения игрока... </div>
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