import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export const CustomNavbar = () => {
    const navigate = useNavigate();
    const { user, fnLogout } = useContext(AuthContext);

    const handleLogout = () => {
        fnLogout();
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" className="mb-4" style={{ height: "3.75rem" }}>
            <Container>
                <h2>
                    <Link to="/" className="link-light text-decoration-none">
                        Chat App
                    </Link>
                </h2>
                {!!user && <span className="text-warning">Logged in as {user?.name}</span>}
                <Nav className="mr-auto">
                    {!!user && (
                        <Stack direction="horizontal" gap={3}>
                            <Button className="link-light text-decoration-none" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Stack>
                    )}
                    {!user && (
                        <Stack direction="horizontal" gap={3}>
                            <Link to={"/login"} className="link-light text-decoration-none">
                                Login
                            </Link>
                            <Link to={"/register"} className="link-light text-decoration-none">
                                Register
                            </Link>
                        </Stack>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};
