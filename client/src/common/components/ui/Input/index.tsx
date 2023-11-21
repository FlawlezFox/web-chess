import IInput from "../../../interfaces/IInput";

import styles from "./index.module.css";

const Input = ({className, label}: IInput) => {
    return (
        <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>
                {label}
            </div>
            <input type="text" className={styles[className]}/>
        </div>
    );
}

export default Input;