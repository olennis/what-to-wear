import type { Clothing, Outfit, Season, Fit } from '../types';
import { getColorHarmonyScore } from './colorUtils';

function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

function getFitCompatibilityScore(fit1: Fit, fit2: Fit, category1: string, category2: string): number {
  // 상의가 오버핏이면 하의는 슬림/레귤러가 좋음
  if (category1 === 'top' && category2 === 'bottom') {
    if (fit1 === 'overfit') {
      if (fit2 === 'slim') return 100;
      if (fit2 === 'regular') return 80;
      return 50;
    }
    // 상의가 슬림이면 모든 하의 OK
    if (fit1 === 'slim') return 90;
    // 레귤러는 중간
    return 75;
  }
  return 75;
}

function filterBySeason(clothes: Clothing[], season: Season): Clothing[] {
  return clothes.filter((c) => c.season.includes(season));
}

export interface RecommendedOutfit {
  outfit: Outfit;
  score: number;
  reasons: string[];
}

export function getRecommendations(
  baseClothing: Clothing,
  allClothes: Clothing[],
  limit: number = 5
): RecommendedOutfit[] {
  const currentSeason = getCurrentSeason();
  const seasonFiltered = filterBySeason(allClothes, currentSeason);

  const tops = seasonFiltered.filter((c) => c.category === 'top' && c.id !== baseClothing.id);
  const bottoms = seasonFiltered.filter((c) => c.category === 'bottom' && c.id !== baseClothing.id);

  const recommendations: RecommendedOutfit[] = [];

  // 기준 옷의 카테고리에 따라 조합 생성
  const baseCategory = baseClothing.category;

  if (baseCategory === 'top') {
    // 상의 기준: 하의 매칭
    for (const bottom of bottoms) {
      const colorScore = getColorHarmonyScore(baseClothing.color, bottom.color);
      const fitScore = getFitCompatibilityScore(baseClothing.fit, bottom.fit, 'top', 'bottom');
      const totalScore = (colorScore + fitScore) / 2;

      const reasons: string[] = [];
      if (colorScore >= 80) reasons.push('색상 조화가 좋음');
      if (fitScore >= 80) reasons.push('핏 밸런스가 좋음');

      recommendations.push({
        outfit: { top: baseClothing, bottom },
        score: totalScore,
        reasons,
      });
    }
  } else if (baseCategory === 'bottom') {
    // 하의 기준: 상의 매칭
    for (const top of tops) {
      const colorScore = getColorHarmonyScore(baseClothing.color, top.color);
      const fitScore = getFitCompatibilityScore(top.fit, baseClothing.fit, 'top', 'bottom');
      const totalScore = (colorScore + fitScore) / 2;

      const reasons: string[] = [];
      if (colorScore >= 80) reasons.push('색상 조화가 좋음');
      if (fitScore >= 80) reasons.push('핏 밸런스가 좋음');

      recommendations.push({
        outfit: { top, bottom: baseClothing },
        score: totalScore,
        reasons,
      });
    }
  } else if (baseCategory === 'outer') {
    // 아우터 기준: 상의 + 하의 조합
    for (const top of tops.slice(0, 3)) {
      for (const bottom of bottoms.slice(0, 3)) {
        const colorScore1 = getColorHarmonyScore(baseClothing.color, top.color);
        const colorScore2 = getColorHarmonyScore(baseClothing.color, bottom.color);
        const colorScore3 = getColorHarmonyScore(top.color, bottom.color);
        const avgColorScore = (colorScore1 + colorScore2 + colorScore3) / 3;

        const fitScore = getFitCompatibilityScore(top.fit, bottom.fit, 'top', 'bottom');
        const totalScore = (avgColorScore + fitScore) / 2;

        const reasons: string[] = [];
        if (avgColorScore >= 75) reasons.push('전체적인 색상 조화가 좋음');

        recommendations.push({
          outfit: { outer: baseClothing, top, bottom },
          score: totalScore,
          reasons,
        });
      }
    }
  } else {
    // 신발 기준: 상의 + 하의 조합
    for (const top of tops.slice(0, 3)) {
      for (const bottom of bottoms.slice(0, 3)) {
        const colorScore1 = getColorHarmonyScore(baseClothing.color, bottom.color);
        const colorScore2 = getColorHarmonyScore(top.color, bottom.color);
        const avgColorScore = (colorScore1 + colorScore2) / 2;

        const fitScore = getFitCompatibilityScore(top.fit, bottom.fit, 'top', 'bottom');
        const totalScore = (avgColorScore + fitScore) / 2;

        recommendations.push({
          outfit: { shoes: baseClothing, top, bottom },
          score: totalScore,
          reasons: [],
        });
      }
    }
  }

  // 점수순 정렬 후 상위 N개 반환
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// 무작위 추천 (홈 화면용)
export function getRandomRecommendation(allClothes: Clothing[]): Outfit | null {
  const currentSeason = getCurrentSeason();
  const seasonFiltered = filterBySeason(allClothes, currentSeason);

  const tops = seasonFiltered.filter((c) => c.category === 'top');
  const bottoms = seasonFiltered.filter((c) => c.category === 'bottom');

  if (tops.length === 0 || bottoms.length === 0) {
    return null;
  }

  // 가장 높은 점수의 조합 찾기
  let bestOutfit: Outfit = {};
  let bestScore = 0;

  for (const top of tops) {
    for (const bottom of bottoms) {
      const colorScore = getColorHarmonyScore(top.color, bottom.color);
      const fitScore = getFitCompatibilityScore(top.fit, bottom.fit, 'top', 'bottom');
      const score = (colorScore + fitScore) / 2;

      if (score > bestScore) {
        bestScore = score;
        bestOutfit = { top, bottom };
      }
    }
  }

  return bestOutfit;
}
