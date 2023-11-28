import { To } from "react-router-dom";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    color: "Blue" | "Orange";
    isLink?: boolean;
    to?: To;
}

export default IButton;