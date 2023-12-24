import { Link } from "react-router-dom";
import IconChessBoard from "../../assets/svg/icon-chess-board.svg?react";

// styles
import styles from "./index.module.css";

const PageAbout = () => {
    return (
        <div className={styles.pageWrapper}>
            <Link className={styles.gameTitle} to="/">
                <IconChessBoard className={styles.iconChessBoard} />
                <h1 className={styles.header}>Шахматный гений</h1>
            </Link>

            <div className={styles.title}>Информация о разработчиках</div>

            <div className={styles.universityInfo}>
                <div className={styles.paragraph}>Самарский университет</div>
                <div className={styles.paragraph}>Кафедра программных систем</div>
            </div>

            <div className={styles.paragraph}>Курсовой проект по дисциплине «Программная инженерия»</div>

            <div className={styles.paragraph}>Тема проекта: «Приложение «Игра «Шахматы»</div>

            <div className={styles.paragraph}>Разработчики (обучающиеся группы 6415-020302D):</div>

            <div className={styles.developers}>
                <div className={styles.paragraph}>Аракелян А.А.</div>
                <div className={styles.paragraph}>Донсков Д.В.</div>
            </div>

            <div className={styles.paragraph}>Руководитель: Зеленко Л.С.</div>

            <div className={styles.footer}>Самара 2023</div>
        </div>
    ); 
}

export default PageAbout;