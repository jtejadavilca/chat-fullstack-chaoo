import { createContext, useCallback, useEffect, useState } from "react";
import { createChat, getUserChats, saveMessage } from "../services/chatService";
import { useFetchPotentialChats } from "../hooks/useFetchPotentialChats";
import { getChatMessages } from "../services/messagesService";
import io from "socket.io-client";

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
    const [onlineUsers, setOnlineUsers] = useState([]);

    /**
     * Init socket connection
     */
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [user]);

    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            console.log("connected to socket server");
            socket.emit("addNewUser", user?._id);
        });

        socket.on("disconnect", () => {
            console.log("disconnected from socket server");
            //socket.emit("removeUser", user?._id);
        });

        socket.on("onlineUsers", (users) => {
            console.log("online users: ", users);
            setOnlineUsers(users.map((u) => u.userId));
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, [socket, user]);
    //---------------------------------

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
        };

        fetchMessages();
    }, [currentChat]);

    useEffect(() => {
        if (user == null) setCurrentChat(null);
    }, [user]);

    const onUpdateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

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

    const onSaveMessage = useCallback(
        async (message) => {
            console.log("enviando message...:", message);
            const response = await saveMessage(currentChat._id, user._id, message);
            if (response.error) {
                console.error("Error creating message", response);
                return setMessagesError(response);
            }

            setMessages([...messages, response]);
        },
        [messages, user]
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
                onSaveMessage,

                onlineUsers,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
