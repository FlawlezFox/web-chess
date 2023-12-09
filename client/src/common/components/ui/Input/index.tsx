import IInput from "../../../interfaces/IInput";

import styles from "./index.module.css";

const Input = ({className, label, errorMessage, ...rest}: IInput) => {
    return (
        <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>
                {label}
            </div>

            <input 
                type="text" 
                className={styles[className]}
                {...rest}
            />

            {
                errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>
            }
        </div>
    );
}

export default Input;