import { Link } from "react-router-dom";
import IconChessBoard from "../../assets/svg/icon-chess-board.svg?react";

// styles
import styles from "./index.module.css";

const PageInfo = () => {
    return (
        <div className={styles.pageWrapper}>
            <Link className={styles.gameTitle} to="/">
                <IconChessBoard className={styles.iconChessBoard} />
                <h1 className={styles.header}>Шахматный гений</h1>
            </Link>

            <div className={styles.title}>Справочная информация</div>

            <div className={styles.sectionHeader}>Как играть шахматы на этом сайте?</div>
            <div className={styles.section}>
                <div className={styles.paragraph}>
                    Для того, чтобы получить доступ к игре нужно ввести логин.
                    Логин считается допустимым, если он написан латиницей, длиной от 4 до 16 букв,
                    может включать в себя символы “-” и “_”.
                </div>

                <div className={styles.paragraph}>
                    Если вы выберете кнопку “Начать игру”,
                    то у вас откроется диалоговое окно, в котором будет сгенерирован уникальный код комнаты.
                    Его можно скопировать и передать второму пользователю.
                </div>

                <div className={styles.paragraph}>
                    Для присоединения к комнате вам необходимо выбрать кнопку “Войти в комнату”,
                    получить код игровой комнаты от первого игрока и подключиться к нему.
                </div>

                <div className={styles.paragraph}>
                    Как только оба пользователя подключатся к комнате, начнется игровая сессия.
                </div>

                <div className={styles.paragraph}>
                    На каждый ход уделяется 1 минута. Игра длится до тех пор,
                    пока один из игроков не выиграет партию или заранее не завершит игру
                    (кнопками “Сдаться” или “Ничья”).
                </div>

                <div className={styles.paragraph}>
                    Чтобы игра завершилась ничьей, необходимо соглашение от обоих пользователей.
                </div>
            </div>
        </div>
    );
}

export default PageInfo;