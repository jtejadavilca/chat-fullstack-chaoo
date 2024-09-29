import { getRequest, postRequest } from "../utils/services";

export const registerUser = async (userInfo) => {
    try {
        const response = await postRequest("/api/auth/register", userInfo);
        return await response;
    } catch (error) {
        const errorMessage = "Error registering user";
        console.error(errorMessage, error);
        return { error: true, message: errorMessage };
    }
};

export const loginUser = async (userInfo) => {
    try {
        const response = await postRequest("/api/auth/login", userInfo);
        return await response;
    } catch (error) {
        const errorMessage = "Error logging in user";
        console.error(errorMessage, error);
        return { error: true, message: errorMessage };
    }
};

export const getProfile = async (token) => {
    try {
        const response = await getRequest("/api/auth/profile", token);
        return await response;
    } catch (error) {
        const errorMessage = "Error getting profile";
        console.error(errorMessage, error);
        return { error: true, message: errorMessage };
    }
};

export const recoverPassword = async (email) => {
    try {
        const response = await postRequest("/api/auth/recover", { email });
        return await response;
    } catch (error) {
        console.error("Error recovering password", error);
    }
};
