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
    const [mode, setMode] = useState<"Invite" | "Join">("Invite");

    function handleStartGame(mode: "Invite" | "Join") {
        setMode(mode);

        const modal: HTMLElement | null = document.getElementById("modalWindow");

        if (modal !== null && modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    }

    return (
        <div className="page-wrapper">

            {
                mode === "Invite"
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
                        onClick={() => handleStartGame("Invite")}
                    />

                    <Button
                        label="Войти в комнату"
                        color="Orange"
                        onClick={() => handleStartGame("Join")}
                    />
                </div>
            </form>

            <Footer />
        </div>
    );
}

export default PageHome;