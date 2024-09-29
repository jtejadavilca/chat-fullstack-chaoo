import { createContext, useCallback, useEffect, useState } from "react";
import { createChat, getUserChats } from "../services/chatService";
import { useFetchPotentialChats } from "../hooks/useFetchPotentialChats";

export const ChatContext = createContext(null);

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const { potentialChats, isPotentialChatsLoading, errorPotentialChats } = useFetchPotentialChats(user, userChats);

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
    }, [user]);

    const onCreateChat = useCallback(
        async (recipientId) => {
            const response = await createChat(user?._id, recipientId);
            if (response.error) {
                console.error("Error creating chat", response);
                return setUserChatsError(response);
            }

            if (!userChats.some((chat) => chat._id === response._id)) {
                setUserChats([...userChats, response]);
            }
        },
        [user, userChats]
    );

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserChatsLoading,
                userChatsError,

                potentialChats,
                onCreateChat,
                isPotentialChatsLoading,
                errorPotentialChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
