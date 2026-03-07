import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CalculatorPage from './pages/CalculatorPage';

function App() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator/:breadName" element={<CalculatorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
