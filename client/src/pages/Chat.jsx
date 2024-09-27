import { useEffect } from "react";
import { getToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

export const Chat = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (getToken() == null) {
            navigate("/login");
        }
    }, []);
    return <div>Chat</div>;
};
