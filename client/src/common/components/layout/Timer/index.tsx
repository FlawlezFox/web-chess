import { useEffect} from "react";
import ITimer from "../../../interfaces/ITimer";
import cn from "classnames";

// styles
import styles from "./index.module.css";
import { useTimer } from "react-timer-hook";

const Timer = ({currentPlayer}: ITimer) => {
    const time = new Date();
    const timer = useTimer({expiryTimestamp: time, onExpire});

    const timeLeftStyle = cn(timer.totalSeconds < 10 ? "errorTime" : "timeLeft")

    useEffect(() => {
        time.setSeconds(time.getSeconds() + 60);
        timer.restart(time, true);
    }, [currentPlayer]);

    function onExpire() {
        // TODO: make losing logic when timer is expired
        alert("You lose");
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