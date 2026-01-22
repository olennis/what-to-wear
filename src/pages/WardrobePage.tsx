import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWardrobeStore } from '../store/useWardrobeStore';
import { ClothingList } from '../components/wardrobe/ClothingList';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import type { Category } from '../types';

export function WardrobePage() {
  const navigate = useNavigate();
  const { clothes, removeClothing } = useWardrobeStore();
  const [filter, setFilter] = useState<Category | 'all'>('all');

  const handleDelete = (id: string) => {
    if (confirm('이 옷을 삭제할까요?')) {
      removeClothing(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="내 옷장" />

      <main className="pt-14 px-4 py-6">
        <ClothingList
          clothes={clothes}
          onDelete={handleDelete}
          filterCategory={filter}
          onFilterChange={setFilter}
        />
      </main>

      {/* 추가 버튼 */}
      <button
        onClick={() => navigate('/wardrobe/add')}
        className="fixed bottom-20 right-4 w-14 h-14 bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-600 transition-colors z-40"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      <BottomNav />
    </div>
  );
}
