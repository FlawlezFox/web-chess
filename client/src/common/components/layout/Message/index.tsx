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
}

const Message = ({ icon, message, description, open }: MessageProps) => {
    const time = new Date();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const timer = useTimer({ expiryTimestamp: time, onExpire });
    const navigate = useNavigate();

    useEffect(() => {
        time.setSeconds(time.getSeconds() + 5);
        timer.restart(time, true);
    }, []);

    function onExpire() {
        navigate("/");
    }

    return (
        <>
            <dialog id="messageWindow" className={styles.messageWindow} open={open}>
                {icon === "win" ? <IconTrophy /> : <IconHandshake />}

                <div className={styles.message}>{message}</div>

                {description && <div className={styles.description}>{description}</div>}

                <div className={styles.redirectMessage}>Вы будете перенаправлены на главный экран через {timer.seconds} секунд</div>
            </dialog>
            <div className={styles.backdrop}></div>
        </>
    );
}

export default Message;