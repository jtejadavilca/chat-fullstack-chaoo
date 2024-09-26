import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
export const Register = () => {
    const navigate = useNavigate();

    const { registerInfo, fnUpdateRegisterInfo, fnRegisterUser, registerError, setRegisterError, isRegisterLoading } =
        useContext(AuthContext);

    const [enabledRegisterButton, setEnabledRegisterButton] = useState(false);

    useEffect(() => {
        const { name, email, password, confirmPassword } = registerInfo;
        const enabled = name.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0;
        setEnabledRegisterButton(enabled);
    }, [registerInfo]);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (registerInfo.password !== registerInfo.confirmPassword) {
            return setRegisterError("Passwords do not match!");
        }

        const respRegister = await fnRegisterUser();

        if (respRegister) {
            navigate("/login");
        }
    };

    return (
        <Form onSubmit={handleRegister}>
            <Row>
                <Col>
                    <Stack gap={3}>
                        <h2>Register</h2>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control
                                type="text"
                                placeholder="Enter fullname"
                                value={registerInfo.name}
                                onChange={(e) => fnUpdateRegisterInfo({ name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={registerInfo.email}
                                onChange={(e) => fnUpdateRegisterInfo({ email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={registerInfo.password}
                                onChange={(e) => fnUpdateRegisterInfo({ password: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={registerInfo.confirmPassword}
                                onChange={(e) => fnUpdateRegisterInfo({ confirmPassword: e.target.value })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!enabledRegisterButton}>
                            Register
                        </Button>

                        {registerError && <Alert variant="danger">{registerError}</Alert>}

                        <span className="text-secondary">
                            Already have an account?{" "}
                            <Link to={"/login"} className="link-light text-decoration-none">
                                Login
                            </Link>
                        </span>
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
};
