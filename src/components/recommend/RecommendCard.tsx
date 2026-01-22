import type { RecommendedOutfit } from '../../utils/recommendEngine';
import { OutfitPreview } from '../avatar/OutfitPreview';

interface RecommendCardProps {
  recommendation: RecommendedOutfit;
  onSelect?: () => void;
}

export function RecommendCard({ recommendation, onSelect }: RecommendCardProps) {
  return (
    <div className="relative">
      <OutfitPreview
        outfit={recommendation.outfit}
        score={recommendation.score}
        reasons={recommendation.reasons}
      />
      {onSelect && (
        <button
          onClick={onSelect}
          className="w-full mt-3 py-3 px-4 rounded-xl font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
        >
          이 코디 선택
        </button>
      )}
    </div>
  );
}
