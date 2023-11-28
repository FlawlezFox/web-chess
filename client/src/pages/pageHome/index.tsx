import { useState } from "react";

// components
import IconChessBoard from "../../assets/svg/icon-chess-board.svg?react";
import Input from "../../common/components/ui/Input/index";
import Button from "../../common/components/ui/Button/index";
import Footer from "../../common/components/layout/Footer/index";
import Modal from "../../common/components/layout/Modal/index";

// styles
import styles from "./index.module.css";

const PageHome = () => {
    const [isStart, setIsStart] = useState<boolean>(false);

    function handleSetIsStart() {
        if (isStart === false) {
            setIsStart(true);
        } else {
            setIsStart(false);
        }

        console.log(isStart);
    }

    function handleStartGame() {
        handleSetIsStart();

        const modal: HTMLElement | null = document.getElementById("modalWindow");

        if (modal !== null && modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    }

    return (
        <div className="page-wrapper">

            {
                isStart
                ? <Modal mode="Invite" />
                : <Modal mode="Join" />
            }

            <div className={styles.gameTitle}>
                <IconChessBoard />
                <h1 className={styles.header}>Шахматный гений</h1>
            </div>

            <form action="" className={styles.formLogin} onSubmit={(event) => {event.preventDefault()}}>
                <Input
                    className="inputLogin"
                    label="Введите логин:"
                />

                <div className={styles.buttonsContainer}>
                    <Button
                        label="Начать игру"
                        color="Blue"
                        onClick={handleStartGame}
                    />

                    <Button
                        label="Войти в комнату"
                        color="Orange"
                        onClick={handleStartGame}
                    />
                </div>
            </form>

            <Footer />
        </div>
    );
}

export default PageHome;