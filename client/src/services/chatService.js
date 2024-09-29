import { getRequest, postRequest } from "../utils/services";

export const createChat = async (userId, recipientId) => {
    try {
        const response = await postRequest(`/api/users/${userId}/chats`, { recipientId });
        return response;
    } catch (error) {
        const errorMessage = "Error creating chat";
        console.error(errorMessage, error);
        return { error: true, message: errorMessage };
    }
};
export const getUserChats = async (userId) => {
    try {
        const response = await getRequest(`/api/users/${userId}/chats`);
        return response;
    } catch (error) {
        const errorMessage = "Error getting user chats";
        console.error(errorMessage, error);
        return { error: true, message: errorMessage };
    }
};

export const getUserPotenialChats = async (userId) => {
    try {
        const response = await getRequest(`/api/users/${userId}/chats/potenial`);
        return response;
    } catch (error) {
        const errorMessage = "Error getting user potential chats";
        console.error(errorMessage, error);
        return { error: true, message: errorMessage };
    }
};

export const saveMessage = async (chatId, senderId, message) => {
    try {
        const response = await postRequest(`/api/chats/${chatId}/messages`, { senderId, text: message });
        return response;
    } catch (error) {
        const errorMessage = "Error saving message";
        console.error(errorMessage, error);
        return { error: true, message: errorMessage };
    }
};
