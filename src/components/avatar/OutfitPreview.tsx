import { useAvatarStore } from '../../store/useAvatarStore';
import type { Outfit } from '../../types';
import { CATEGORY_LABELS, FIT_LABELS } from '../../types';
import { Avatar } from './Avatar';

interface OutfitPreviewProps {
  outfit: Outfit;
  score?: number;
  reasons?: string[];
}

export function OutfitPreview({ outfit, score, reasons }: OutfitPreviewProps) {
  const { config } = useAvatarStore();

  const outfitItems = [outfit.outer, outfit.top, outfit.bottom, outfit.shoes].filter(Boolean);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 아바타 */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <Avatar config={config} outfit={outfit} size="md" />
      </div>

      {/* 코디 정보 */}
      <div className="p-4 space-y-3">
        {score !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">매칭 점수</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-sm font-medium text-indigo-600">{Math.round(score)}점</span>
          </div>
        )}

        {reasons && reasons.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {reasons.map((reason, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full"
              >
                {reason}
              </span>
            ))}
          </div>
        )}

        {/* 아이템 목록 */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          {outfitItems.map((item) => (
            <div key={item!.id} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg border border-gray-200"
                style={{ backgroundColor: item!.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item!.type}
                </p>
                <p className="text-xs text-gray-500">
                  {CATEGORY_LABELS[item!.category]} · {FIT_LABELS[item!.fit]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
