import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    className: string;
    label: string;
    errorMessage: string;
}

export default IInput;