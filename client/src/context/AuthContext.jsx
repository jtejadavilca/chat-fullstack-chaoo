import { createContext, useCallback, useState } from "react";
import { loginUser, registerUser } from "../utils/services";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Login
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    // Register
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const fnUpdateRegisterInfo = useCallback(
        (info) => {
            setRegisterInfo((prev) => ({ ...prev, ...info }));
            setRegisterError(null);
        },
        [registerInfo, registerError]
    );

    const fnUpdateLoginInfo = useCallback(
        (info) => {
            setLoginInfo((prev) => ({ ...prev, ...info }));
            setLoginError(null);
        },
        [loginInfo, loginError]
    );

    const fnRegisterUser = useCallback(async () => {
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await registerUser(registerInfo);

        if (response.error) {
            setRegisterError(response.message);
            return false;
        }

        setRegisterError(null);
        setUser(response.user);
        setIsRegisterLoading(false);
        setRegisterInfo({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        return true;
    }, [registerInfo, registerError]);

    const fnLoginUser = useCallback(async () => {
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await loginUser(loginInfo);

        if (response.error) {
            setLoginError(response.message);
            return false;
        }

        setLoginError(null);
        setUser(response.user);
        setIsLoginLoading(false);
        setLoginInfo({
            email: "",
            password: "",
        });
        return true;
    }, [loginInfo, loginError]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loginInfo,
                fnUpdateLoginInfo,
                fnLoginUser,
                loginError,
                setLoginError,
                isLoginLoading,

                registerInfo,
                fnUpdateRegisterInfo,
                fnRegisterUser,
                registerError,
                setRegisterError,
                isRegisterLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
