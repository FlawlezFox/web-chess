import IHistory from "../../../interfaces/IHistory";

// components
import IconGiveup from "../../../../assets/svg/icon-giveup.svg?react";
import IconHandshake from "../../../../assets/svg/icon-handshake.svg?react";

// styles
import styles from "./index.module.css";

const HistoryPanel = ({moves}: IHistory) => {
    return (
        <div className={styles.panelContainer}>
            <div className={styles.heading}>
                История ходов
            </div>

            <hr />

            <ol className={styles.movesList}>
                {
                    moves.map((move, id) =>
                        <li className={styles[move.color || "null"]} key={id}>
                            {move.move} &nbsp;
                            
                            {
                                move.figure?.icon 
                                    ? <img src={move.figure.icon} alt="icon.svg" width={16} height={16} /> 
                                    : ""
                            }
                        </li>
                    )
                }
            </ol>

            <div className={styles.buttonsContainer}>
                <hr />

                <div className={styles.buttons}>
                    <button className={styles.buttonGiveup}>
                        <div className={styles.buttonContainer}>
                            <IconGiveup />

                            <span className={styles.buttonLabel}>Сдаться</span>
                        </div>
                    </button>

                    <button className={styles.buttonTie}>
                        <div className={styles.buttonContainer}>
                            <IconHandshake />

                            <span className={styles.buttonLabel}>Ничья</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HistoryPanel;