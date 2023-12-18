import { useState } from "react";

const useMessage = () => {
    const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [messageIcon, setMessageIcon] = useState<"win" | "draw">("win");

    const showMessage = (
        icon: "win" | "draw",
        messageText: string,
        descriptionText: string
    ) => {
        setMessageIcon(icon);
        setMessage(messageText);
        setDescription(descriptionText);
        setIsMessageOpen(true);
    };

    const hideMessage = () => {
        setIsMessageOpen(false);
    }

    return {
        isMessageOpen,
        message,
        description,
        messageIcon,
        showMessage,
        hideMessage,
    };
}

export default useMessage;