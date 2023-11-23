import IconInter from "../../../../assets/svg/icon-interrogation.svg?react";
import IconInfo from "../../../../assets/svg/icon-info.svg?react";

import styles from "./index.module.css";

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <button>
                <IconInter />
            </button>

            <button>
                <IconInfo />
            </button>
        </div>
    );
}

export default Footer;