import { useState } from "react";

const useMessage = () => {
    const [isWaiting, setIsWaiting] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [messageIcon, setMessageIcon] = useState<"win" | "draw">("win");

    const showMessage = (
        icon: "win" | "draw",
        messageText: string,
        descriptionText: string,
        wait: boolean,
    ) => {
        setMessageIcon(icon);
        setMessage(messageText);
        setDescription(descriptionText);
        setIsMessageOpen(true);
        setIsWaiting(wait);
    };

    const hideMessage = () => {
        setIsMessageOpen(false);
    }

    return {
        isMessageOpen,
        message,
        description,
        messageIcon,
        isWaiting,
        showMessage,
        hideMessage,
    };
}

export default useMessage;