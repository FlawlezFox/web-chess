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
import { nanoid } from "nanoid";

const PageHome = () => {
    const [mode, setMode] = useState<"Invite" | "Join">("Invite");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [userName, setUserName] = useState<string>("");
    const [player, setPlayer] = useState<Player>();

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
        if (!validateUserName()) {
            setErrorMessage('Логин должен состоять из латинских букв, цифр, "-", "_", длиной от 4 до 16 символов')
            return;
        }
        setErrorMessage("");

        setMode(mode);

        const modal: HTMLElement | null = document.getElementById("modalWindow");

        if (modal !== null && modal instanceof HTMLDialogElement) {
            modal.showModal();
        }
    }

    function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (validateUserName() === false) {
            return;
        }

        // if player invites other player his color will be white and he will receive game id, otherwise black
        if (mode === "Invite") {
            setPlayer(new Player(userName, Colors.WHITE, nanoid()));
        } else {
            setPlayer(new Player(userName, Colors.BLACK));
        }

        // UNCOMMENT WHEN TESTING IS OVER
        // authorise(player);
    }

    return (
        <div className="page-wrapper">

            {
                mode === "Invite"
                ? <Modal mode="Invite" player={player}/>
                : <Modal mode="Join" player={player} />
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