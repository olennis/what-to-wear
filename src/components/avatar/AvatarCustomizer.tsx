import type { AvatarConfig, BodyType } from '../../types';
import { SKIN_TONES } from '../../types';
import { Avatar } from './Avatar';

interface AvatarCustomizerProps {
  config: AvatarConfig;
  onChange: (config: Partial<AvatarConfig>) => void;
}

const BODY_TYPES: { value: BodyType; label: string }[] = [
  { value: 'slim', label: '슬림' },
  { value: 'regular', label: '보통' },
  { value: 'wide', label: '와이드' },
];

export function AvatarCustomizer({ config, onChange }: AvatarCustomizerProps) {
  return (
    <div className="space-y-6">
      {/* 아바타 미리보기 */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <Avatar config={config} size="lg" />
      </div>

      {/* 피부톤 선택 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">피부톤</h3>
        <div className="flex gap-3 flex-wrap">
          {SKIN_TONES.map((tone) => (
            <button
              key={tone.hex}
              onClick={() => onChange({ skinTone: tone.hex })}
              className={`w-12 h-12 rounded-full border-2 transition-all ${
                config.skinTone === tone.hex
                  ? 'border-indigo-500 scale-110 shadow-lg'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              style={{ backgroundColor: tone.hex }}
              title={tone.name}
            />
          ))}
        </div>
      </div>

      {/* 체형 선택 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">체형</h3>
        <div className="flex gap-2">
          {BODY_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => onChange({ bodyType: type.value })}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                config.bodyType === type.value
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
