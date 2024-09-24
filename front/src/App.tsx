import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/header/Header';
import Artist from './pages/Artist';
import { Recommendations } from './pages/Recommendations';
import AuthCallback from './pages/AuthCallback';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Artist />} />
          <Route path="Recommendations" element={<Recommendations />} />
          <Route path="auth/callback" element={<AuthCallback />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;