import { useNavigate } from 'react-router-dom';
import { useWardrobeStore } from '../store/useWardrobeStore';
import { useAvatarStore } from '../store/useAvatarStore';
import { getRandomRecommendation } from '../utils/recommendEngine';
import { Avatar } from '../components/avatar/Avatar';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { CATEGORY_LABELS } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const { clothes } = useWardrobeStore();
  const { config } = useAvatarStore();

  const todayOutfit = getRandomRecommendation(clothes);

  const categoryCounts = {
    top: clothes.filter((c) => c.category === 'top').length,
    bottom: clothes.filter((c) => c.category === 'bottom').length,
    outer: clothes.filter((c) => c.category === 'outer').length,
    shoes: clothes.filter((c) => c.category === 'shoes').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="오늘 뭐 입지?" />

      <main className="pt-14 px-4 py-6 space-y-6">
        {/* 오늘의 추천 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            오늘의 추천 코디
          </h2>

          {todayOutfit ? (
            <div className="bg-gradient-to-b from-indigo-50 to-purple-50 rounded-xl p-4">
              <Avatar config={config} outfit={todayOutfit} size="lg" />
              <div className="mt-4 space-y-2">
                {todayOutfit.top && (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md border"
                      style={{ backgroundColor: todayOutfit.top.color }}
                    />
                    <span className="text-sm text-gray-700">
                      {todayOutfit.top.type}
                    </span>
                  </div>
                )}
                {todayOutfit.bottom && (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md border"
                      style={{ backgroundColor: todayOutfit.bottom.color }}
                    />
                    <span className="text-sm text-gray-700">
                      {todayOutfit.bottom.type}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>옷장에 옷을 추가하면</p>
              <p>추천 코디를 볼 수 있어요!</p>
            </div>
          )}

          <button
            onClick={() => navigate('/recommend')}
            className="w-full mt-4 py-3 px-4 rounded-xl font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
          >
            다른 코디 추천받기
          </button>
        </section>

        {/* 내 옷장 요약 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">내 옷장</h2>
            <span className="text-sm text-gray-500">총 {clothes.length}벌</span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {(Object.keys(categoryCounts) as Array<keyof typeof categoryCounts>).map(
              (cat) => (
                <div
                  key={cat}
                  onClick={() => navigate('/wardrobe')}
                  className="bg-gray-50 rounded-xl p-3 text-center cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <p className="text-2xl font-bold text-indigo-600">
                    {categoryCounts[cat]}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {CATEGORY_LABELS[cat]}
                  </p>
                </div>
              )
            )}
          </div>

          <button
            onClick={() => navigate('/wardrobe/add')}
            className="w-full mt-4 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            + 새 옷 추가하기
          </button>
        </section>

        {/* 아바타 */}
        <section
          onClick={() => navigate('/avatar')}
          className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
              <Avatar config={config} size="sm" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">내 아바타</h2>
              <p className="text-sm text-gray-500">체형과 피부톤을 설정하세요</p>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
