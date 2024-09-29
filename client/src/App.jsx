import { Routes, Route, Navigate } from "react-router-dom";
import { CustomNavbar } from "./components";
import { Chat, Login, Register } from "./pages";
import { Container } from "react-bootstrap";
import { RecoverPassword } from "./pages/RecoverPassword";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
    const { user } = useContext(AuthContext);

    return (
        <ChatContextProvider user={user}>
            <CustomNavbar />
            <Container>
                <Routes>
                    <Route path="/" element={user ? <Chat /> : <Login />} />
                    <Route path="*" element={<Navigate to="/" />} />

                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                    <Route path="/recover-password" element={user ? <Navigate to="/" /> : <RecoverPassword />} />
                </Routes>
            </Container>
        </ChatContextProvider>
    );
}

export default App;
