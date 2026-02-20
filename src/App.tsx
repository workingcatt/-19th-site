import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Entrance from './pages/Entrance';
import Main from './pages/Main';
import Characters from './pages/Characters';
import Webtoon from './pages/Webtoon';
import Map from './pages/Map';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] text-gray-100 font-sans selection:bg-amber-500/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<Entrance />} />
          <Route path="/main" element={<Main />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/webtoon" element={<Webtoon />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}
