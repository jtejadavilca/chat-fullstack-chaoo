import React from "react";
import { useFetchRecipientUser } from "../hooks/_";
import { Stack } from "react-bootstrap";
import avatar from "../../src/assets/profile.svg";

export const UserChat = ({ chat, user }) => {
    const { recipientUser, error } = useFetchRecipientUser(chat, user);

    return (
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between">
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} alt="user" height="35px" className="user-image" />
                </div>
                <div className="text-content">
                    <div className="name">{recipientUser?.name.toUpperCase() || "Unknown"}</div>
                    <div className="text">Text Message</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">12/12/2022</div>
                <div className="this-user-notifications">2</div>
                <span className="user-online"></span>
            </div>
        </Stack>
    );
};
