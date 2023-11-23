interface IButton {
    label: string;
    color: "Blue" | "Orange";
    onClick?: () => void;
}

export default IButton;