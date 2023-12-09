import { FormEvent, useState } from "react";
import { Player } from "../../models/Player";
import { Colors } from "../../models/Colors";
import { authorise } from "../../common/service/userS";

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

    const [userName, setUserName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    function handleSetUserName(event: React.ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value.trim());

        if (!validateUserName()) {
            setErrorMessage('Логин должен состоять из латинских букв, цифр, "-", "_", длиной от 4 до 16 символов')
        } else {
            setErrorMessage("");
        }
    }

    function validateUserName(){
        const regex = /^[a-zA-Z0-9_-]{4,16}$/;

        return regex.test(userName);
    }

    function handleStartGame(mode: "Invite" | "Join") {
        if (validateUserName() === false) {
            return;
        }

        setMode(mode);

        const modal: HTMLElement | null = document.getElementById("modalWindow");

        if (modal !== null && modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    }

    function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let player: Player;

        // if player invites other player his color will be white, otherwise black
        if (mode === "Invite") {
            player = new Player(userName, Colors.WHITE);
        } else {
            player = new Player(userName, Colors.BLACK);
        }

        authorise(player);
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

            <form action="" className={styles.formLogin} onSubmit={(event) => handleOnSubmit(event)}>
                <Input
                    className="inputLogin"
                    label="Введите логин:"
                    errorMessage={errorMessage}
                    onChange={(event) => handleSetUserName(event)}
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