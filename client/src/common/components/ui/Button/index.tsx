import IButton from "../../../interfaces/IButton";
import { Link } from "react-router-dom";
import cn from "classnames";

// styles
import styles from "./index.module.css";

const Button = ({ label, color, isLink, to, onClick }: IButton) => {
    const className = cn({ blueButton: color === "Blue", orangeButton: color === "Orange" });

    return (
        isLink
            ? <Link to={to || "/"}>
                <div className={styles.buttonContainer}>
                    <button className={styles[className]} onClick={onClick}>{label}</button>
                </div>
            </Link>
            
            : <div className={styles.buttonContainer}>
                <button className={styles[className]} onClick={onClick}>{label}</button>
            </div>
    );
}

export default Button;