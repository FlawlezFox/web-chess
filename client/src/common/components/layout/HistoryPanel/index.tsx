import IHistory from "../../../interfaces/IHistory";
import { useEffect, useState } from "react";

// components
import IconGiveup from "../../../../assets/svg/icon-giveup.svg?react";
import IconHandshake from "../../../../assets/svg/icon-handshake.svg?react";
import IconDownload from "../../../../assets/svg/icon-download.svg?react";

// styles
import styles from "./index.module.css";

const HistoryPanel = ({ moves, showConfirmWindow, showDrawWindow }: IHistory) => {
    const [logData, setLogData] = useState<string>("");

    function convertMovesToLog() {
        return moves.map((move, index) => `${index + 1}. ${move.move} ${move.figure ? "съедена: " + move.figure.name + " " + move.figure.color : ''}\t${move.color}\n`).join("");
    }

    function downloadFile() {
        if (logData) {
            const blob = new Blob([logData], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "gamehistory.log");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
      }

    useEffect(() => {
        setLogData(convertMovesToLog());
    }, [moves]);

    return (
        <>
            <div className={styles.panelContainer}>
                <div className={styles.heading}>
                    <div className={styles.headingText}>История ходов</div>

                    <button className={styles.buttonGiveup} onClick={downloadFile}>
                        <div className={styles.buttonContainer}>
                            <span className={styles.buttonLabel}>Скачать</span>
                            <IconDownload className={styles.iconDownload} />
                        </div>
                    </button>
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
                        <button className={styles.buttonGiveup} onClick={showConfirmWindow}>
                            <div className={styles.buttonContainer}>
                                <IconGiveup />

                                <span className={styles.buttonLabel}>Сдаться</span>
                            </div>
                        </button>

                        <button className={styles.buttonTie} onClick={showDrawWindow}>
                            <div className={styles.buttonContainer}>
                                <IconHandshake />

                                <span className={styles.buttonLabel}>Ничья</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HistoryPanel;