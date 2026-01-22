export type Category = 'top' | 'bottom' | 'outer' | 'shoes';
export type Fit = 'overfit' | 'regular' | 'slim';
export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export type BodyType = 'slim' | 'regular' | 'wide';

export interface Clothing {
  id: string;
  category: Category;
  type: string;
  fit: Fit;
  color: string;
  colorName: string;
  season: Season[];
  imageUrl?: string;
  createdAt: number;
}

export interface AvatarConfig {
  skinTone: string;
  bodyType: BodyType;
}

export interface Outfit {
  top?: Clothing;
  bottom?: Clothing;
  outer?: Clothing;
  shoes?: Clothing;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  top: '상의',
  bottom: '하의',
  outer: '아우터',
  shoes: '신발',
};

export const FIT_LABELS: Record<Fit, string> = {
  overfit: '오버핏',
  regular: '레귤러핏',
  slim: '슬림핏',
};

export const SEASON_LABELS: Record<Season, string> = {
  spring: '봄',
  summer: '여름',
  fall: '가을',
  winter: '겨울',
};

export const CLOTHING_TYPES: Record<Category, string[]> = {
  top: ['티셔츠', '후드티', '맨투맨', '셔츠', '니트', '블라우스', '카라티'],
  bottom: ['청바지', '슬랙스', '면바지', '반바지', '치마', '조거팬츠'],
  outer: ['자켓', '코트', '패딩', '가디건', '바람막이', '블레이저'],
  shoes: ['운동화', '구두', '부츠', '샌들', '슬리퍼', '로퍼'],
};

export const COLOR_PALETTE = [
  { name: '흰색', hex: '#FFFFFF' },
  { name: '검정', hex: '#1a1a1a' },
  { name: '회색', hex: '#6b7280' },
  { name: '네이비', hex: '#1e3a5f' },
  { name: '베이지', hex: '#d4b896' },
  { name: '브라운', hex: '#8b5a2b' },
  { name: '카키', hex: '#6b6b47' },
  { name: '빨강', hex: '#dc2626' },
  { name: '분홍', hex: '#ec4899' },
  { name: '주황', hex: '#f97316' },
  { name: '노랑', hex: '#eab308' },
  { name: '초록', hex: '#16a34a' },
  { name: '하늘', hex: '#0ea5e9' },
  { name: '파랑', hex: '#2563eb' },
  { name: '보라', hex: '#7c3aed' },
];

export const SKIN_TONES = [
  { name: '밝은 피부', hex: '#FFE0BD' },
  { name: '살구색', hex: '#FFCD94' },
  { name: '중간 피부', hex: '#EAC086' },
  { name: '올리브', hex: '#C68642' },
  { name: '갈색 피부', hex: '#8D5524' },
  { name: '어두운 피부', hex: '#5C3317' },
];
