import { useAvatarStore } from '../store/useAvatarStore';
import { AvatarCustomizer } from '../components/avatar/AvatarCustomizer';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';

export function AvatarPage() {
  const { config, updateConfig } = useAvatarStore();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="내 아바타" />

      <main className="pt-14 px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <AvatarCustomizer config={config} onChange={updateConfig} />
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          설정은 자동으로 저장됩니다
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
