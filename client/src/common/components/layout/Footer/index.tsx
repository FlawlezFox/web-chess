import IconInter from "../../../../assets/svg/icon-interrogation.svg?react";
import IconInfo from "../../../../assets/svg/icon-info.svg?react";
import { Link } from "react-router-dom";

import styles from "./index.module.css";

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <Link to="/about">
                <button>
                    <IconInter />
                </button>
            </Link>

            <Link to="/info">
                <button>
                    <IconInfo />
                </button>
            </Link>
        </div>
    );
}

export default Footer;