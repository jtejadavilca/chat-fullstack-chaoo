import React, { useContext, useEffect, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipientUser } from "../hooks/_";
import moment from "moment";
import InputEmoji from "react-input-emoji";

export const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, onSaveMessage } = useContext(ChatContext);
    const [textMessage, setTextMessage] = useState("");
    const chatBox = useRef();

    const { recipientUser, recipientUserError } = useFetchRecipientUser(currentChat, user);

    useEffect(() => {
        chatBox.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, currentChat]);

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
    };

    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong>{recipientUser?.name}</strong>
            </div>

            <Stack gap={3} className="messages">
                {messages.map((message) => (
                    <Stack
                        ref={chatBox}
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
