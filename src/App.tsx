import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WardrobePage } from './pages/WardrobePage';
import { AddClothingPage } from './pages/AddClothingPage';
import { AvatarPage } from './pages/AvatarPage';
import { RecommendPage } from './pages/RecommendPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wardrobe" element={<WardrobePage />} />
        <Route path="/wardrobe/add" element={<AddClothingPage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
