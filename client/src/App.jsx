import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat, Login, Register } from './pages/';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
