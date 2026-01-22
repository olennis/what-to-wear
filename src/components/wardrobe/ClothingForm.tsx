import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Clothing, Category, Fit, Season } from '../../types';
import {
  CATEGORY_LABELS,
  FIT_LABELS,
  SEASON_LABELS,
  CLOTHING_TYPES,
  COLOR_PALETTE,
} from '../../types';

interface ClothingFormProps {
  onSubmit: (clothing: Clothing) => void;
  onCancel: () => void;
}

export function ClothingForm({ onSubmit, onCancel }: ClothingFormProps) {
  const [category, setCategory] = useState<Category>('top');
  const [type, setType] = useState(CLOTHING_TYPES.top[0]);
  const [fit, setFit] = useState<Fit>('regular');
  const [color, setColor] = useState(COLOR_PALETTE[0]);
  const [seasons, setSeasons] = useState<Season[]>(['spring', 'fall']);

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setType(CLOTHING_TYPES[newCategory][0]);
  };

  const toggleSeason = (season: Season) => {
    setSeasons((prev) =>
      prev.includes(season)
        ? prev.filter((s) => s !== season)
        : [...prev, season]
    );
  };

  const handleSubmit = () => {
    if (seasons.length === 0) {
      alert('계절을 하나 이상 선택해주세요');
      return;
    }

    const clothing: Clothing = {
      id: uuidv4(),
      category,
      type,
      fit,
      color: color.hex,
      colorName: color.name,
      season: seasons,
      createdAt: Date.now(),
    };

    onSubmit(clothing);
  };

  return (
    <div className="space-y-6">
      {/* 카테고리 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* 종류 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          종류
        </label>
        <div className="flex flex-wrap gap-2">
          {CLOTHING_TYPES[category].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                type === t
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 핏 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">핏</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(FIT_LABELS) as Fit[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFit(f)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                fit === f
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {FIT_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* 색상 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          색상: {color.name}
        </label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PALETTE.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => setColor(c)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                color.hex === c.hex
                  ? 'border-indigo-500 scale-110 shadow-lg'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* 계절 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          계절 (복수 선택 가능)
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(SEASON_LABELS) as Season[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSeason(s)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                seasons.includes(s)
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {SEASON_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 py-3 px-4 rounded-xl font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
