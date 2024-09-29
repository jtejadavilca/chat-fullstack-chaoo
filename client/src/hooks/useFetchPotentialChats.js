import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";

export const useFetchPotentialChats = (user = {}, userChats) => {
    const [isPotentialChatsLoading, setIsPotentialChatsLoading] = useState(false);
    const [potentialChats, setPotentialChats] = useState([]);
    const [errorPotentialChats, setErrorPotentialChats] = useState(null);
    const { _id: userId, token } = user || {};

    useEffect(() => {
        const fetchRecipient = async () => {
            if (!userId) {
                return;
            }
            setIsPotentialChatsLoading(true);
            const response = await getRequest(`/api/users/${userId}/chats/potential`, token);

            setIsPotentialChatsLoading(false);

            if (response.error) {
                setErrorPotentialChats(response);
                return;
            }

            setPotentialChats(response);
        };

        fetchRecipient();
    }, [user, userChats]);

    return { potentialChats, isPotentialChatsLoading, errorPotentialChats };
};
