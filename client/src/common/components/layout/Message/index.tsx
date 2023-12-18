import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";

// components
import IconTrophy from "../../../../assets/svg/icon-trophy.svg?react";
import IconHandshake from "../../../../assets/svg/icon-handshake.svg?react";

// styles
import styles from "./index.module.css";

interface MessageProps {
    icon: "win" | "draw";
    message: string;
    description?: string;
    open?: boolean;
    wait?: boolean;
}

const Message = ({ icon, message, description, open, wait }: MessageProps) => {
    const time = new Date(Date.now() + 5000);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const timer = useTimer({ expiryTimestamp: time, onExpire });
    const navigate = useNavigate();

    useEffect(() => {
        timer.restart(time, true);
    }, []);

    useEffect(() => {
        if (wait) {
            timer.pause();
        } else if (!timer.isRunning) {
            timer.resume();
        }
    }, [wait, timer]);

    function onExpire() {
        wait ? "" : navigate("/");
    }

    return (
        <>
            <dialog id="messageWindow" className={styles.messageWindow} open={open}>
                {icon === "win" ? <IconTrophy /> : <IconHandshake />}

                <div className={styles.message}>{message}</div>

                {description && <div className={styles.description}>{description}</div>}

                {wait || <div className={styles.redirectMessage}>Вы будете перенаправлены на главный экран через {timer.totalSeconds} секунд</div>}
            </dialog>
            <div className={styles.backdrop}></div>
        </>
    );
}

export default Message;