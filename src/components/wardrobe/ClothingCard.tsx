import type { Clothing } from '../../types';
import { FIT_LABELS } from '../../types';

interface ClothingCardProps {
  clothing: Clothing;
  onDelete?: (id: string) => void;
  onClick?: (clothing: Clothing) => void;
  selected?: boolean;
}

export function ClothingCard({ clothing, onDelete, onClick, selected }: ClothingCardProps) {
  return (
    <div
      onClick={() => onClick?.(clothing)}
      className={`relative bg-white rounded-xl border-2 overflow-hidden transition-all ${
        onClick ? 'cursor-pointer hover:shadow-md' : ''
      } ${selected ? 'border-indigo-500 shadow-md' : 'border-gray-100'}`}
    >
      {/* 색상 프리뷰 */}
      <div
        className="h-24 w-full"
        style={{ backgroundColor: clothing.color }}
      >
        {clothing.color === '#FFFFFF' && (
          <div className="w-full h-full border-b border-gray-200" />
        )}
      </div>

      {/* 정보 */}
      <div className="p-3">
        <p className="font-medium text-gray-900 text-sm">{clothing.type}</p>
        <p className="text-xs text-gray-500 mt-1">
          {clothing.colorName} · {FIT_LABELS[clothing.fit]}
        </p>
      </div>

      {/* 삭제 버튼 */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(clothing.id);
          }}
          className="absolute top-2 right-2 w-6 h-6 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* 선택 표시 */}
      {selected && (
        <div className="absolute top-2 left-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
}
