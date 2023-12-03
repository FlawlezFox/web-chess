import ICell from "../../../interfaces/ICell";
import cn from "classnames";

// styles
import styles from "./index.module.css";

const CellComponent = ({ cell }: ICell) => {
    const className: string = cn(styles["cell"], styles[cell.color]);

    return (
        <>
            {
                cell.x + cell.y === "a8"
                    ? <div className={className}>
                        {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                        <span className={styles.xCoordinates}>{cell.x}</span>
                        <span className={styles.yCoordinates}>{cell.y}</span>
                    </div>

                    : cell.y === 8
                        ? <div className={className}>
                            {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                            <span className={styles.xCoordinates}>{cell.x}</span>
                        </div>

                        : cell.x === "a"
                            ? <div className={className}>
                                {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                                <span className={styles.yCoordinates}>{cell.y}</span>
                            </div>

                            : <div className={className}>
                                {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                            </div>

            }
        </>
    );
}

export default CellComponent;