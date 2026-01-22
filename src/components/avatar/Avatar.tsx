import type { AvatarConfig, Outfit } from '../../types';

interface AvatarProps {
  config: AvatarConfig;
  outfit?: Outfit;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ config, outfit, size = 'md' }: AvatarProps) {
  const sizeMap = {
    sm: { width: 120, height: 200 },
    md: { width: 180, height: 300 },
    lg: { width: 240, height: 400 },
  };

  const { width, height } = sizeMap[size];
  const { skinTone, bodyType } = config;

  // 체형에 따른 몸 너비 조절
  const bodyWidth = bodyType === 'slim' ? 0.8 : bodyType === 'wide' ? 1.2 : 1;
  const shoulderWidth = 50 * bodyWidth;
  const torsoWidth = 40 * bodyWidth;
  const hipWidth = 45 * bodyWidth;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 200"
      className="mx-auto"
    >
      {/* 머리 */}
      <ellipse cx="60" cy="25" rx="20" ry="22" fill={skinTone} />

      {/* 머리카락 (간단) */}
      <ellipse cx="60" cy="15" rx="18" ry="10" fill="#4a3728" />

      {/* 목 */}
      <rect x="52" y="45" width="16" height="12" fill={skinTone} rx="3" />

      {/* 몸통 (상의가 있으면 상의 색상) */}
      <path
        d={`
          M ${60 - shoulderWidth} 57
          Q ${60 - shoulderWidth - 5} 70, ${60 - torsoWidth} 100
          L ${60 - hipWidth} 130
          L ${60 + hipWidth} 130
          L ${60 + torsoWidth} 100
          Q ${60 + shoulderWidth + 5} 70, ${60 + shoulderWidth} 57
          Z
        `}
        fill={outfit?.top?.color || '#e5e7eb'}
      />

      {/* 상의 디테일 - 옷 종류에 따라 */}
      {outfit?.top && (
        <>
          {/* 칼라/넥라인 */}
          <path
            d={`M 50 57 Q 60 65, 70 57`}
            stroke={outfit.top.color === '#FFFFFF' ? '#d1d5db' : '#00000020'}
            strokeWidth="2"
            fill="none"
          />
        </>
      )}

      {/* 팔 */}
      <ellipse
        cx={60 - shoulderWidth - 8}
        cy="80"
        rx="8"
        ry="25"
        fill={outfit?.top?.color || '#e5e7eb'}
      />
      <ellipse
        cx={60 + shoulderWidth + 8}
        cy="80"
        rx="8"
        ry="25"
        fill={outfit?.top?.color || '#e5e7eb'}
      />

      {/* 손 */}
      <ellipse cx={60 - shoulderWidth - 8} cy="108" rx="6" ry="8" fill={skinTone} />
      <ellipse cx={60 + shoulderWidth + 8} cy="108" rx="6" ry="8" fill={skinTone} />

      {/* 아우터가 있으면 덧그리기 */}
      {outfit?.outer && (
        <>
          <path
            d={`
              M ${60 - shoulderWidth - 3} 57
              Q ${60 - shoulderWidth - 8} 70, ${60 - torsoWidth - 3} 100
              L ${60 - hipWidth - 2} 130
              L ${60 - hipWidth + 10} 130
              L ${60 - torsoWidth + 5} 100
              Q ${60 - shoulderWidth} 70, ${60 - shoulderWidth + 5} 60
              Z
            `}
            fill={outfit.outer.color}
            opacity="0.95"
          />
          <path
            d={`
              M ${60 + shoulderWidth + 3} 57
              Q ${60 + shoulderWidth + 8} 70, ${60 + torsoWidth + 3} 100
              L ${60 + hipWidth + 2} 130
              L ${60 + hipWidth - 10} 130
              L ${60 + torsoWidth - 5} 100
              Q ${60 + shoulderWidth} 70, ${60 + shoulderWidth - 5} 60
              Z
            `}
            fill={outfit.outer.color}
            opacity="0.95"
          />
        </>
      )}

      {/* 하의 */}
      <path
        d={`
          M ${60 - hipWidth} 130
          L ${60 - 20} 180
          L ${60 - 5} 180
          L 60 145
          L ${60 + 5} 180
          L ${60 + 20} 180
          L ${60 + hipWidth} 130
          Z
        `}
        fill={outfit?.bottom?.color || '#d1d5db'}
      />

      {/* 신발 */}
      <ellipse cx={60 - 12} cy="188" rx="12" ry="6" fill={outfit?.shoes?.color || '#374151'} />
      <ellipse cx={60 + 12} cy="188" rx="12" ry="6" fill={outfit?.shoes?.color || '#374151'} />

      {/* 옷이 없을 때 안내 텍스트 */}
      {!outfit?.top && !outfit?.bottom && (
        <text x="60" y="105" textAnchor="middle" fontSize="8" fill="#9ca3af">
          옷을 선택하세요
        </text>
      )}
    </svg>
  );
}
