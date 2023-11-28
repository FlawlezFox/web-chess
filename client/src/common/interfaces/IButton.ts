interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    color: "Blue" | "Orange";
}

export default IButton;