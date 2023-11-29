import { Fragment } from "react";
import IBoard from "../../../interfaces/IBoard";

// styles
import styles from "./index.module.css";
import CellComponent from "../CellComponent";

const BoardComponent = ({ board, setBoard }: IBoard) => {
    return (
        <div className={styles.board}>
            {
                board.cells.map((row, id) =>
                    <Fragment key={ id }>
                        {row.map((cell) => 
                            <CellComponent
                                cell={cell}
                                key={cell.id}
                            />
                        )}
                    </Fragment>
                )
            }

        </div>
    );
}

export default BoardComponent;