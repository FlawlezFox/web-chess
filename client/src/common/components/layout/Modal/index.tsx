import IModal from "../../../interfaces/IModal";
import Button from "../../ui/Button/index";
import Input from "../../ui/Input/index";
import IconCross from "../../../../assets/svg/icon-cross.svg?react";

// styles
import styles from "./index.module.css";

const Modal = ({ mode }: IModal) => {
    return (
        <dialog id="modalWindow" className={styles.modalWindow}>
            {
                mode === "Join"
                    ? <ModalJoin />
                    : <ModalInvite />
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
                    <IconCross />
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

const ModalInvite = () => {
    return (
        <>
            <div className={styles.modalHeader}>
                <div className={styles.heading}>Создание игры</div>

                <button className={styles.crossButton} onClick={closeModal}>
                    <IconCross />
                </button>
            </div>

            <div className={styles.inviteContainer}>
                <div className={styles.codeLabel}>Комната доступна по коду: </div>

                <div className={styles.codeContainer}>
                    <span className={styles.code}>1F4IEx</span>
                    <Button
                        color="Blue"
                        label="Скопировать код"
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