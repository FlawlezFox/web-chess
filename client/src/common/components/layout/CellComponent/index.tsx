import ICell from "../../../interfaces/ICell";
import cn from "classnames";

// styles
import styles from "./index.module.css";

const CellComponent = ({ cell, selected, select }: ICell) => {
    const className: string = cn(
        styles["cell"], 
        styles[cell.color], 
        selected ? styles["selected"] : "",
        cell.available && cell.figure ? styles["canAttack"] : ""
    );

    return (
        <>
            {
                cell.x + cell.y === "a8"
                    ? <div className={className} onClick={() => select(cell)}>
                        {cell.available && !cell.figure && <div className={styles.available}></div>}
                        {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                        <span className={styles.xCoordinates}>{cell.x}</span>
                        <span className={styles.yCoordinates}>{cell.y}</span>
                    </div>

                    : cell.y === 8
                        ? <div className={className} onClick={() => select(cell)}>
                            {cell.available && !cell.figure && <div className={styles.available}></div>}
                            {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                            <span className={styles.xCoordinates}>{cell.x}</span>
                        </div>

                        : cell.x === "a"
                            ? <div className={className} onClick={() => select(cell)}>
                                {cell.available && !cell.figure && <div className={styles.available}></div>}
                                {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                                <span className={styles.yCoordinates}>{cell.y}</span>
                            </div>

                            : <div className={className} onClick={() => select(cell)}>
                                {cell.available && !cell.figure && <div className={styles.available}></div>}
                                {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                            </div>

            }
        </>
    );
}

export default CellComponent;