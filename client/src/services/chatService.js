import { getRequest } from "../utils/services";

export const getUserChats = async (userId) => {
    try {
        const response = await getRequest(`/api/users/${userId}/chats`);
        return await response;
    } catch (error) {
        const errorMessage = "Error getting user chats";
        console.error(errorMessage, error);
        return { error: true, message: errorMessage };
    }
};
