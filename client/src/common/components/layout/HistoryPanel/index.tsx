import { Colors } from "../../../../models/Colors";
import IMove from "../../../interfaces/IMove";

// components
import IconGiveup from "../../../../assets/svg/icon-giveup.svg?react";
import IconHandshake from "../../../../assets/svg/icon-handshake.svg?react";

// styles
import styles from "./index.module.css";

// fake moves
const moves: IMove[] = [
    { color: Colors.BLACK, move: "f6" },
    { color: Colors.WHITE, move: "d3" },
    { color: Colors.BLACK, move: "e5" },
    { color: Colors.WHITE, move: "g3" },
];

const HistoryPanel = () => {
    return (
        <div className={styles.panelContainer}>
            <div className={styles.heading}>
                История ходов
            </div>

            <hr />

            <ol className={styles.movesList}>
                {
                    moves.map((move, id) =>
                        <li className={styles[move.color]} key={id}>
                            {move.move}
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