import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AvatarConfig } from '../types';
import { SKIN_TONES } from '../types';

interface AvatarState {
  config: AvatarConfig;
  updateConfig: (config: Partial<AvatarConfig>) => void;
}

export const useAvatarStore = create<AvatarState>()(
  persist(
    (set) => ({
      config: {
        skinTone: SKIN_TONES[1].hex,
        bodyType: 'regular',
      },

      updateConfig: (updates) => {
        set((state) => ({
          config: { ...state.config, ...updates },
        }));
      },
    }),
    {
      name: 'avatar-storage',
    }
  )
);
