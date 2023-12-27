import ICell from "../../../interfaces/ICell";
import cn from "classnames";
import { FigureNames } from "../../../../models/figures/Figure";
import { Colors } from "../../../../models/Colors";

// styles
import styles from "./index.module.css";

const CellComponent = ({ cell, selected, select, whiteKingIsCheck, blackKingIsCheck }: ICell) => {
    const className: string = cn(
        styles["cell"], 
        styles[cell.color], 
        selected ? styles["selected"] : "",
        cell.available && cell.figure && cell.figure.name !== FigureNames.KING ? styles["canAttack"] : "",
        cell.figure && cell.figure.name === FigureNames.KING && whiteKingIsCheck && cell.figure.color === Colors.WHITE ? styles["kingIsCheck"] : "",
        cell.figure && cell.figure.name === FigureNames.KING && blackKingIsCheck && cell.figure.color === Colors.BLACK ? styles["kingIsCheck"] : ""
    );

    return (
        <>
            {
                cell.x + (cell.y + 1) === "a8"
                    ? <div className={className} onClick={() => select(cell)}>
                        {cell.available && !cell.figure && <div className={styles.available}></div>}
                        {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                        <span className={styles.xCoordinates}>{cell.x}</span>
                        <span className={styles.yCoordinates}>{cell.y + 1}</span>
                    </div>

                    : cell.y + 1 === 8
                        ? <div className={className} onClick={() => select(cell)}>
                            {cell.available && !cell.figure && <div className={styles.available}></div>}
                            {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                            <span className={styles.xCoordinates}>{cell.x}</span>
                        </div>

                        : cell.x === "a"
                            ? <div className={className} onClick={() => select(cell)}>
                                {cell.available && !cell.figure && <div className={styles.available}></div>}
                                {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false} />}
                                <span className={styles.yCoordinates}>{cell.y + 1}</span>
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