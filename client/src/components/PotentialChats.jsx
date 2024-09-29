import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export const PotentialChats = () => {
    const { potentialChats, onCreateChat } = useContext(ChatContext);
    return (
        <>
            <div className="all-users">
                {potentialChats
                    .map((pu) => pu.user)
                    .map((u, index) => (
                        <div className="single-user" key={index} onClick={() => onCreateChat(u._id)}>
                            {u.name}
                            <span className="user-online"></span>
                        </div>
                    ))}
            </div>
        </>
    );
};
