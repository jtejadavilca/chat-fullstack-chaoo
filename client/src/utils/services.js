export const baseUrl = "http://localhost:3000";

export const postRequest = async (url, body, token) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${baseUrl}${url}`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });
        const responseData = await response.json();

        if (response.error) {
            let message = responseData?.message ?? responseData;

            return { error: true, message };
        }

        return responseData;
    } catch (error) {
        console.error("Error posting data", error);
    }
};

export const getRequest = async (url, token) => {
    try {
        const headers = {};

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${baseUrl}${url}`, {
            method: "GET",
            headers,
        });
        const responseData = await response.json();

        if (response.error) {
            let message = responseData?.message ?? responseData;

            return { error: true, message };
        }

        return responseData;
    } catch (error) {
        console.error("Error getting data", error);
    }
};
