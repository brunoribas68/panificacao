import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FichaTecnicaPage from './pages/FichaTecnicaPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ficha-tecnica-integral" element={<FichaTecnicaPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
