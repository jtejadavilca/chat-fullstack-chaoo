import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../utils/token";

export const Login = () => {
    const navigate = useNavigate();

    const { loginInfo, fnUpdateLoginInfo, setLoginInfo, loginError, setLoginError, isLoginLoading, fnLoginUser } =
        useContext(AuthContext);

    const [enabledLoginButton, setEnabledLoginButton] = useState(false);

    useEffect(() => {
        const { email, password } = loginInfo;
        const enabled = email.length > 0 && password.length > 0;
        setEnabledLoginButton(enabled);
    }, [loginInfo]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const respLogin = await fnLoginUser();

        if (respLogin) {
            navigate("/chat");
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <Row>
                <Col>
                    <Stack gap={3}>
                        <h2>Login</h2>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={loginInfo.email}
                                onChange={(e) => fnUpdateLoginInfo({ email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={loginInfo.password}
                                onChange={(e) => fnUpdateLoginInfo({ password: e.target.value })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!enabledLoginButton}>
                            Login
                        </Button>

                        {loginError && <Alert variant="danger">{loginError.message}</Alert>}

                        <Row>
                            <Col className="d-flex justify-content-between">
                                <span className="text-secondary">
                                    Don't have an account?{" "}
                                    <Link to={"/register"} className="link-light text-decoration-none">
                                        Register
                                    </Link>
                                </span>
                                <span className="text-secondary">
                                    <Link to={"/recover-password"} className="link-light text-decoration-none">
                                        Forgot your password?
                                    </Link>
                                </span>
                            </Col>
                        </Row>
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
};
