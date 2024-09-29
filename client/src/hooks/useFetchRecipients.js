import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [recipientUserError, setRecipientUserError] = useState(null);

    const recipientId = chat?.members.find((u) => u !== user._id);

    useEffect(() => {
        const fetchRecipient = async () => {
            if (!recipientId) {
                return;
            }

            const response = await getRequest(`/api/users/${recipientId}`, user.token);

            if (response.error) {
                setRecipientUserError(response);
                return;
            }

            setRecipientUser(response.user);
        };

        fetchRecipient();
    }, [recipientId, user]);

    return { recipientUser, recipientUserError };
};
