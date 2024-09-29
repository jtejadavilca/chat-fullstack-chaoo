import { useContext, useEffect } from "react";
import { Container, Stack } from "react-bootstrap";

import { getToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import { UserChat } from "../components/UserChat";
import { AuthContext } from "../context/AuthContext";
import { PotentialChats } from "../components/PotentialChats";

export const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);

    return (
        <Container>
            <PotentialChats />
            {userChats?.length === 0 ? null : (
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading chats...</p>}

                        {userChats?.map((chat) => (
                            <div key={chat._id} gap={3} className="chat-box">
                                <UserChat chat={chat} user={user} />
                            </div>
                        ))}
                    </Stack>

                    <p>Chatbox</p>
                </Stack>
            )}
        </Container>
    );
};
