import { useNavigate } from 'react-router-dom';
import { useWardrobeStore } from '../store/useWardrobeStore';
import { ClothingForm } from '../components/wardrobe/ClothingForm';
import { Header } from '../components/layout/Header';
import type { Clothing } from '../types';

export function AddClothingPage() {
  const navigate = useNavigate();
  const { addClothing } = useWardrobeStore();

  const handleSubmit = (clothing: Clothing) => {
    addClothing(clothing);
    navigate('/wardrobe');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="새 옷 추가" showBack onBack={() => navigate(-1)} />

      <main className="pt-14 px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <ClothingForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
        </div>
      </main>
    </div>
  );
}
