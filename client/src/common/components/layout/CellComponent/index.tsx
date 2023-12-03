import ICell from "../../../interfaces/ICell";
import cn from "classnames";

// styles
import styles from "./index.module.css";

const CellComponent = ({ cell }: ICell) => {
    const className: string = cn(styles["cell"], styles[cell.color]);

    return (
        <div className={className}>
            {cell.figure?.icon && <img src={cell.figure.icon} alt="icon.svg" draggable={false}/>}
        </div>
    );
}

export default CellComponent;