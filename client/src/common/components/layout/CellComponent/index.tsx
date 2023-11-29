import ICell from "../../../interfaces/ICell";
import cn from "classnames";

// styles
import styles from "./index.module.css";

const CellComponent = ({ cell }: ICell) => {
    const className: string = cn(styles["cell"], styles[cell.color]);

    return (
        <div className={className}>

        </div>
    );
}

export default CellComponent;