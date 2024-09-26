import { Routes, Route, Navigate } from 'react-router-dom';
import { CustomNavbar } from './components';
import { Chat, Login, Register } from './pages';
import { Container } from 'react-bootstrap';

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
        </Routes>
      </Container>
    </>
  )
}

export default App
