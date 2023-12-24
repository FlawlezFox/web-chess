
// styles
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Contents = () => {
    return (
        <div className={styles.contentsContainer}>
            <div className={styles.heading}>Содержание</div>

            <hr />

            <ul>
                <li className={styles.listitem}>
                    <Link to="/info#intro">Введение</Link>
                </li>

                <li className={styles.listitem}>
                    <Link to="/info#connect-to-game">Подключение к игре</Link>
                </li>

                <ul>
                    <li className={styles["lismall"]}>
                        <Link to="/info#authorisation">Авторизация</Link>
                    </li>

                    <li className={styles["lismall"]}>
                        <Link to="/info#creating-room">Создание комнаты</Link>
                    </li>
                    
                    <li className={styles["lismall"]}>
                        <Link to="/info#join-room">Вход в комнату</Link>
                    </li>
                </ul>

                <li className={styles.listitem}>
                    <Link to="/info#game-process">Игровой процесс</Link>
                </li>

                <ul>
                    <li className={styles["lismall"]}>
                        <Link to="/info#game-history">История ходов</Link>
                    </li>

                    <li className={styles["lismall"]}>
                        <Link to="/info#give-up">Сдаться</Link>
                    </li>

                    <li className={styles["lismall"]}>
                        <Link to="/info#draw">Ничья</Link>
                    </li>

                    <li className={styles["lismall"]}>
                        <Link to="/info#exit-from-game">Выход из игры</Link>
                    </li>

                    <li className={styles["lismall"]}>
                        <Link to="/info#end-of-timer">Окончание таймера</Link>
                    </li>
                </ul>

                <li className={styles.listitem}>
                    <Link to="/info#exit">Выход из программы</Link>
                </li>
            </ul>
        </div>
    );
}

export default Contents;