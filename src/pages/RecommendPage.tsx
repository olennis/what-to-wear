import { useState, useMemo } from 'react';
import { useWardrobeStore } from '../store/useWardrobeStore';
import { ClothingList } from '../components/wardrobe/ClothingList';
import { RecommendList } from '../components/recommend/RecommendList';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { getRecommendations } from '../utils/recommendEngine';
import type { Clothing, Category } from '../types';

export function RecommendPage() {
  const { clothes } = useWardrobeStore();
  const [selectedClothing, setSelectedClothing] = useState<Clothing | null>(null);
  const [filter, setFilter] = useState<Category | 'all'>('all');

  const recommendations = useMemo(() => {
    if (!selectedClothing) return [];
    return getRecommendations(selectedClothing, clothes, 5);
  }, [selectedClothing, clothes]);

  const handleSelect = (clothing: Clothing) => {
    setSelectedClothing(clothing);
  };

  const handleReset = () => {
    setSelectedClothing(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="코디 추천" />

      <main className="pt-14 px-4 py-6 space-y-6">
        {!selectedClothing ? (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-1">
                기준이 될 옷을 선택하세요
              </h2>
              <p className="text-sm text-gray-500">
                선택한 옷과 어울리는 코디를 추천해드려요
              </p>
            </div>

            <ClothingList
              clothes={clothes}
              onSelect={handleSelect}
              filterCategory={filter}
              onFilterChange={setFilter}
            />
          </>
        ) : (
          <>
            {/* 선택된 옷 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">
                  선택한 옷
                </h2>
                <button
                  onClick={handleReset}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  다시 선택
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl border border-gray-200"
                  style={{ backgroundColor: selectedClothing.color }}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedClothing.type}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedClothing.colorName}
                  </p>
                </div>
              </div>
            </div>

            {/* 추천 결과 */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                추천 코디 {recommendations.length}개
              </h2>
              <RecommendList recommendations={recommendations} />
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
