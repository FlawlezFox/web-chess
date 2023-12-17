
// styles
import styles from "./index.module.css";

interface ConfirmProps {
    message: string;
    handleConfirm: () => void;
    handleCancel: () => void;
    open?: boolean;
}

const Confirm = ({ message, handleConfirm, handleCancel, open }: ConfirmProps) => {
    function handleClose() {
        handleCancel();

        const modal: HTMLElement | null = document.getElementById("confirmWindow");

        if (modal !== null && modal instanceof HTMLDialogElement) {
            modal.close();
        }
    }

    return (
        <>
            <dialog id="confirmWindow" className={styles.confirmWindow} open={open}>
                <div className={styles.confirmMessage}>{message}</div>

                <div className={styles.buttons}>
                    <button className={styles.buttonYes} onClick={handleConfirm}>Да</button>
                    <button className={styles.buttonNo} onClick={handleClose}>Нет</button>
                </div>
            </dialog>
            <div className={styles.backdrop}></div>
        </>
    );
}

export default Confirm;