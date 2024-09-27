export const saveToken = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getUserToken = () => {
    return localStorage.getItem("user");
};

export const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
