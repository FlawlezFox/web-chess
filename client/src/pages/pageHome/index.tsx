// components
import IconChessBoard from "../../assets/svg/icon-chess-board.svg?react";
import Input from "../../common/components/ui/Input/index";
import Button from "../../common/components/ui/Button/index";
import Footer from "../../common/components/layout/Footer/index";

// styles
import styles from "./index.module.css";

const PageHome = () => {
    return (
        <div className="page-wrapper">
            <div className={styles.gameTitle}>
                <IconChessBoard />
                <h1 className={styles.header}>Шахматный гений</h1>
            </div>

            <form action="" className={styles.formLogin}>
                <Input
                    className="inputLogin"
                    label="Введите логин:"
                />

                <div className={styles.buttonsContainer}>
                    <Button
                        label="Начать игру"
                        color="Blue"
                    />

                    <Button
                        label="Войти в комнату"
                        color="Orange"
                    />
                </div>
            </form>

            <Footer />
        </div>
    );
}

export default PageHome;