import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipientUser } from "../hooks/useFetchRecipients";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

export const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
    const [textMessage, setTextMessage] = useState("");

    const { recipientUser, recipientUserError } = useFetchRecipientUser(currentChat, user);

    if (!currentChat || !recipientUser) {
        return <p style={{ textAlign: "center", width: "100%" }}>No conversation selected yet</p>;
    }

    if (isMessagesLoading) {
        return <p>Loading messages...</p>;
    }

    const onSendMessage = () => {
        console.log("Sending message", textMessage);
    };

    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong>{recipientUser?.name}</strong>
            </div>

            <Stack gap={3} className="messages">
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
                        <span>{message.sender}</span>
                        <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                    </Stack>
                ))}
                {messages.length === 0 && <p>No messages yet</p>}
                {/* 

                <div className="message-input">
                    <input type="text" placeholder="Type a message..." />
                    <button>Send</button>
                </div>

                <div className="chat-footer">
                    <span>Typing...</span>
                </div> */}
            </Stack>

            <Stack direction="horizontal" className="chat-input flex-grow-0">
                <InputEmoji
                    value={textMessage}
                    onChange={setTextMessage}
                    cleanOnEnter
                    onEnter={() => onSendMessage()}
                    placeholder="Type a message..."
                />
                <button className="send-btn">Send</button>
            </Stack>
        </Stack>
    );
};
