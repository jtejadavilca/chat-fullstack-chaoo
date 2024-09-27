export const baseUrl = "http://localhost:3000";
export const registerUser = async (userInfo) => {
    try {
        const response = await fetch(`${baseUrl}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        console.log("data:", data);
        return data;
    } catch (error) {
        console.error("Error registering user", error);
    }
};

export const loginUser = async (userInfo) => {
    try {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error logging in user", error);
    }
};

export const getProfile = async (token) => {
    try {
        const response = await fetch(`${baseUrl}/api/auth/profile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting profile", error);
    }
};

export const recoverPassword = async (email) => {
    try {
        const response = await fetch(`${baseUrl}/api/auth/recover-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error recovering password", error);
    }
};
