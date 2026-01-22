import type { RecommendedOutfit } from '../../utils/recommendEngine';
import { RecommendCard } from './RecommendCard';

interface RecommendListProps {
  recommendations: RecommendedOutfit[];
  onSelect?: (index: number) => void;
}

export function RecommendList({ recommendations, onSelect }: RecommendListProps) {
  if (recommendations.length === 0) {
    return (
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <p>추천할 코디가 없어요</p>
        <p className="text-sm mt-1">옷장에 더 많은 옷을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <RecommendCard
          key={index}
          recommendation={rec}
          onSelect={onSelect ? () => onSelect(index) : undefined}
        />
      ))}
    </div>
  );
}
