export const saveToken = ({ user }) => {
    //localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
    return getValidToken();
};

export const getUserToken = () => {
    if (getValidToken()) {
        return localStorage.getItem("user");
    }
    return null;
};

export const removeToken = () => {
    localStorage.clear();
};

export const getValidToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    let validToken = null;

    try {
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            validToken = decodedToken.exp * 1000 > Date.now() ? token : null;
        }
    } catch (error) {
        console.error("Error validating token", error);
    }
    if (validToken === null) {
        removeToken();
    }

    return validToken;
};
