import { createContext, useEffect, useState } from "react";
import { getUserChats } from "../services/chatService";

export const ChatContext = createContext(null);

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    useEffect(() => {
        const fetchUserChats = async () => {
            setIsUserChatsLoading(true);
            setUserChatsError(null);

            if (!user || !user._id) {
                return;
            }

            const response = await getUserChats(user._id);
            setIsUserChatsLoading(false);

            if (response.error) {
                return setUserChatsError(response);
            }

            setUserChats(response);
        };

        fetchUserChats();
    }, []);

    return (
        <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatsError }}>
            {children}
        </ChatContext.Provider>
    );
};
