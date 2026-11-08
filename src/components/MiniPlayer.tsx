import React from 'react';
import { Video, Language } from '../types';
import { translations } from '../utils/i18n';
import { Maximize2, X, Play } from 'lucide-react';
import { sound } from '../utils/sound';

interface MiniPlayerProps {
  video: Video | null;
  lang: Language;
  onExpand: () => void;
  onClose: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  video,
  lang,
  onExpand,
  onClose,
}) => {
  if (!video) return null;
  const t = translations[lang];
  const title = lang === 'ar' ? video.title : video.titleEn || video.title;

  return (
    <div className="fixed bottom-20 end-4 z-40 w-[92vw] max-w-sm rounded-2xl bg-white/95 dark:bg-[#0f1523]/95 backdrop-blur-md shadow-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden flex items-center p-2 gap-3 animate-in slide-in-from-bottom-6 duration-200">
      {/* Thumbnail with overlay */}
      <div
        onClick={() => {
          sound.playClickTick();
          onExpand();
        }}
        className="relative w-20 aspect-video rounded-xl bg-slate-900 overflow-hidden shrink-0 cursor-pointer group"
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-5 h-5 fill-white text-white" />
        </div>
      </div>

      {/* Info */}
      <div
        onClick={() => {
          sound.playClickTick();
          onExpand();
        }}
        className="flex-1 min-w-0 cursor-pointer"
      >
        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
          {title}
        </p>
        <p className="text-[11px] text-orange-500 font-medium">
          Egyfox Technology
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => {
            sound.playClickTick();
            onExpand();
          }}
          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={t.expandPlayer}
          aria-label="Expand player"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            sound.playClickTick();
            onClose();
          }}
          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={t.closePlayer}
          aria-label="Close player"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
