import IButton from "../../../interfaces/IButton";
import cn from "classnames";

// styles
import styles from "./index.module.css";

const Button = ({label, color} : IButton) => {
    const className = cn({blueButton: color === "Blue", orangeButton: color === "Orange"});
    
    return (
        <div className={styles.buttonContainer}>
            <button className={styles[className]}>{label}</button>
        </div>
    );
}

export default Button;