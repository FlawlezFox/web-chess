import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import ITimer from "../../../interfaces/ITimer";
import cn from "classnames";

// styles
import styles from "./index.module.css";
import { playerTimerExpired } from "../../../service/gameS";

const Timer = ({ currentPlayer, opponentPlayer, showMessage }: ITimer) => {
    const time = new Date();
    const timer = useTimer({ expiryTimestamp: time, onExpire });

    const timeLeftStyle = cn(timer.totalSeconds < 10 ? "errorTime" : "timeLeft")

    useEffect(() => {
        time.setSeconds(time.getSeconds() + 60);
        timer.restart(time, true);
        timer.pause();
    }, [currentPlayer]);

    function onExpire() {
        // emit event that indicates that he lost
        if (currentPlayer?.color !== opponentPlayer?.color) { 
            playerTimerExpired(currentPlayer);
            showMessage("win", `Игрок ${opponentPlayer?.name} победил`, "Вы проиграли", false);
        }
    }

    return (
        <div className={styles.timer}>
            Время на ход:&nbsp;
            <span className={styles[timeLeftStyle]}>
                {
                    timer.totalSeconds === 60
                        ? "1:00"
                        : timer.totalSeconds < 10
                            ? `0:0${timer.totalSeconds}`
                            : `0:${timer.totalSeconds}`
                }
            </span>
        </div>
    );
}

export default Timer;