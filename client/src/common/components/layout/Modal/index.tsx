import IModal from "../../../interfaces/IModal";
import { useEffect, useState } from "react";
import { createNewGame } from "../../../service/gameS";

// components
import Button from "../../ui/Button/index";
import Input from "../../ui/Input/index";
import IconCross from "../../../../assets/svg/icon-cross.svg?react";

// styles
import styles from "./index.module.css";

interface InviteProps {
    gameId: string | undefined;
}

const Modal = ({ mode, player }: IModal) => {

    useEffect(() => {
        createNewGame(player);
    }, [player]);

    return (
        <dialog id="modalWindow" className={styles.modalWindow}>
            {
                mode === "Join"
                    ? <ModalJoin />
                    : <ModalInvite
                        gameId={player?.gameId}
                      />
            }
        </dialog>
    );
}

const ModalJoin = () => {
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
                onSubmit={(event) => { event.preventDefault() }}
                className={styles.joinForm}
            >
                <Input
                    className="inputCode"
                    label="Введите код игры:"
                    errorMessage="Неверный код или такой комнаты не существует"
                />

                <Button
                    color="Blue"
                    label="Войти в игру"
                    isLink={true}
                    to="/game"
                />
            </form>
        </>
    );
}

const ModalInvite = ({gameId}: InviteProps) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    function copyCode() {
        if (gameId) {
            navigator.clipboard.writeText(gameId);
            setIsClicked(true);
        }
        console.log(gameId);
    }

    function handleCloseModal() {
        closeModal(); 
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
                    <span className={styles.code}>{gameId}</span>
                    <Button
                        color="Blue"
                        label="Скопировать код"
                        onClick={copyCode}
                    />
                    <span className={styles.message}>{isClicked ? "Код скопирован в буфер обмена" : ""}</span>
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