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

                <button>
                    <IconCross />
                </button>
            </div>

            <Input
                className="inputCode"
                label="Введите код игры:"
            />

            <Button
                color="Blue"
                label="Войти в игру"
            />
        </>
    );
}

const ModalInvite = () => {
    return (
        <>
            <div className={styles.modalHeader}>
                <div className={styles.heading}>Создание игры</div>
            </div>
        </>
    );
}

export default Modal;