import React, { useCallback, useState } from "react";
import { recoverPassword } from "../services/authService";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export const RecoverPassword = () => {
    const [enabledRecoveryButton, setEnabledRecoveryButton] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [isRecoveryLoading, setIsRecoveryLoading] = useState(false);
    const [recoveryError, setRecoveryError] = useState(null);
    const [recoveryInfo, setRecoveryInfo] = useState({
        email: "",
    });

    const handleRecoverPassword = useCallback(
        async (e) => {
            e.preventDefault();
            setIsRecoveryLoading(true);
            setRecoveryError(null);
            const response = await recoverPassword(recoveryInfo);

            setIsRecoveryLoading(false);
            setEmailSent(true);

            if (response.error) {
                setRecoveryError(response);
            }
        },
        [recoveryInfo]
    );

    const fnUpdateRecoveryInfo = useCallback(
        (info) => {
            setRecoveryInfo((prev) => ({ ...prev, ...info }));
            setRecoveryError(null);
            setEnabledRecoveryButton(info.email.length > 0);
        },
        [recoveryInfo]
    );

    return (
        <Form onSubmit={handleRecoverPassword}>
            <Row>
                <Col>
                    <Stack gap={3}>
                        <h2>Recover your password</h2>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={recoveryInfo.email}
                                onChange={(e) => fnUpdateRecoveryInfo({ email: e.target.value })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!enabledRecoveryButton}>
                            {isRecoveryLoading ? "Sending email..." : "Send email"}
                        </Button>

                        {recoveryError && <Alert variant="danger">{recoveryError.message}</Alert>}

                        {emailSent && <Alert variant="success">Email sent</Alert>}

                        <span className="text-secondary">
                            <Link to={"/login"} className="link-light text-decoration-none">
                                Go to login
                            </Link>
                        </span>
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
};
