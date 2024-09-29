import { getRequest, postRequest } from "../utils/services";

export const getChatMessages = async (chatId) => {
    try {
        const response = await getRequest(`/api/chats/${chatId}/messages`);
        return response;
    } catch (error) {
        const errorMessage = "Error getting chat messages";
        console.error(errorMessage, error);
        return { error: true, message: errorMessage };
    }
};
