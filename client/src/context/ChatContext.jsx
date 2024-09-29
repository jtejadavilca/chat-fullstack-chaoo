import { createContext, useCallback, useEffect, useState } from "react";
import { createChat, getUserChats } from "../services/chatService";
import { useFetchPotentialChats } from "../hooks/useFetchPotentialChats";
import { getChatMessages } from "../services/messagesService";

export const ChatContext = createContext(null);

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const { potentialChats, isPotentialChatsLoading, errorPotentialChats } = useFetchPotentialChats(user, userChats);
    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);

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

    useEffect(() => {
        const fetchMessages = async () => {
            setIsMessagesLoading(true);
            setMessagesError(null);

            if (!currentChat || !currentChat._id) {
                return;
            }

            const response = await getChatMessages(currentChat._id);
            setIsMessagesLoading(false);

            if (response.error) {
                return setMessagesError(response);
            }

            setMessages(response);
            console.log("messages", messages);
        };

        fetchMessages();
    }, [currentChat]);

    const onUpdateCurrentChat = (chat) => {
        setCurrentChat(chat);
    };

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

                currentChat,
                onUpdateCurrentChat,

                messages,
                isMessagesLoading,
                messagesError,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
