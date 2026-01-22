import type { Clothing, Category } from '../../types';
import { CATEGORY_LABELS } from '../../types';
import { ClothingCard } from './ClothingCard';

interface ClothingListProps {
  clothes: Clothing[];
  onDelete?: (id: string) => void;
  onSelect?: (clothing: Clothing) => void;
  selectedId?: string;
  filterCategory?: Category | 'all';
  onFilterChange?: (category: Category | 'all') => void;
}

const categories: (Category | 'all')[] = ['all', 'top', 'bottom', 'outer', 'shoes'];

export function ClothingList({
  clothes,
  onDelete,
  onSelect,
  selectedId,
  filterCategory = 'all',
  onFilterChange,
}: ClothingListProps) {
  const filteredClothes =
    filterCategory === 'all'
      ? clothes
      : clothes.filter((c) => c.category === filterCategory);

  return (
    <div className="space-y-4">
      {/* 카테고리 필터 */}
      {onFilterChange && (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterCategory === cat
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? '전체' : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      )}

      {/* 옷 목록 */}
      {filteredClothes.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <p>등록된 옷이 없어요</p>
          <p className="text-sm mt-1">옷을 추가해보세요!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredClothes.map((clothing) => (
            <ClothingCard
              key={clothing.id}
              clothing={clothing}
              onDelete={onDelete}
              onClick={onSelect}
              selected={selectedId === clothing.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
