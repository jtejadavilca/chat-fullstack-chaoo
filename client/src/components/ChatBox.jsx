import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipientUser } from "../hooks/_";
import moment from "moment";
import InputEmoji from "react-input-emoji";

/*const scrollDown = (element) => {
    if (element) {
        element.scrollTop = element.scrollHeight;
    }
};*/

export const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, onSaveMessage } = useContext(ChatContext);
    const [textMessage, setTextMessage] = useState("");
    const chatBox = useRef(null);

    const { recipientUser, recipientUserError } = useFetchRecipientUser(currentChat, user);

    const handleScroll = useCallback(
        (element) => {
            if (element) {
                element.scrollTo({
                    top: element.scrollHeight,
                    left: 0,
                    behavior: "smooth",
                });
            }
        },
        [chatBox, messages, currentChat]
    );

    useEffect(() => {
        handleScroll(chatBox?.current);
    }, [messages, currentChat, handleScroll]);

    if (!currentChat || !recipientUser) {
        return <p style={{ textAlign: "center", width: "100%" }}>No conversation selected yet</p>;
    }

    if (isMessagesLoading) {
        return <p>Loading messages...</p>;
    }

    const onSendMessage = () => {
        if (textMessage.trim().length === 0) return;

        onSaveMessage(recipientUser._id, textMessage);
        setTextMessage("");
        setTimeout(() => handleScroll(chatBox?.current), 100);
    };

    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong>{recipientUser?.name}</strong>
            </div>

            <Stack gap={3} className="messages" ref={chatBox}>
                {messages.map((message) => (
                    <Stack
                        key={message._id}
                        className={`${
                            message.sender === user?._id
                                ? "message self align-self-end flex-grow-0"
                                : "message align-self-start flex-grow-0"
                        }`}
                    >
                        <span>{message.text}</span>
                        <span className="message-footer mt-3">{moment(message.createdAt).calendar()}</span>
                    </Stack>
                ))}
                {messages.length === 0 && <p>No messages yet</p>}
            </Stack>

            <Stack direction="horizontal" className="chat-input flex-grow-0">
                <InputEmoji
                    value={textMessage}
                    onChange={setTextMessage}
                    cleanOnEnter
                    onEnter={() => onSendMessage()}
                    placeholder="Type a message..."
                />
                <button className="send-btn" onClick={() => onSendMessage()}>
                    <LuSendHorizonal />
                </button>
            </Stack>
        </Stack>
    );
};
