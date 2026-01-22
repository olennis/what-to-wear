// 색상 조화 판단 유틸리티

const NEUTRAL_COLORS = ['#FFFFFF', '#1a1a1a', '#6b7280', '#d4b896', '#8b5a2b', '#6b6b47'];

export function isNeutralColor(hex: string): boolean {
  return NEUTRAL_COLORS.some(
    (neutral) => neutral.toLowerCase() === hex.toLowerCase()
  );
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// 색상 조화 점수 계산 (0-100)
export function getColorHarmonyScore(color1: string, color2: string): number {
  // 둘 다 무채색이면 높은 점수
  if (isNeutralColor(color1) && isNeutralColor(color2)) {
    return 85;
  }

  // 하나가 무채색이면 항상 어울림
  if (isNeutralColor(color1) || isNeutralColor(color2)) {
    return 90;
  }

  const hsl1 = hexToHsl(color1);
  const hsl2 = hexToHsl(color2);

  const hueDiff = Math.abs(hsl1.h - hsl2.h);
  const normalizedHueDiff = hueDiff > 180 ? 360 - hueDiff : hueDiff;

  // 유사색 (30도 이내)
  if (normalizedHueDiff <= 30) {
    return 80;
  }

  // 보색 (150-180도)
  if (normalizedHueDiff >= 150) {
    return 70;
  }

  // 그 외
  return 50;
}
