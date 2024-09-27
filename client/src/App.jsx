import { Routes, Route, Navigate } from "react-router-dom";
import { CustomNavbar } from "./components";
import { Chat, Login, Register } from "./pages";
import { Container } from "react-bootstrap";
import { RecoverPassword } from "./pages/RecoverPassword";

function App() {
    return (
        <>
            <CustomNavbar />
            <Container className="text-secondary">
                <Routes>
                    <Route path="/" element={<Chat />} />
                    <Route path="*" element={<Navigate to="/" />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/recover-password" element={<RecoverPassword />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
