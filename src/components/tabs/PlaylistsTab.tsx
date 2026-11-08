import React, { useState } from 'react';
import { Playlist, Video, Language } from '../../types';
import { translations } from '../../utils/i18n';
import { VideoCard } from '../VideoCard';
import { Layers, ArrowRight, ArrowLeft, Play, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

interface PlaylistsTabProps {
  playlists: Playlist[];
  videos: Video[];
  lang: Language;
  onPlayVideo: (video: Video) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onShare: (video: Video) => void;
  selectedPlaylistId?: string | null;
  onClearSelectedPlaylist?: () => void;
}

export const PlaylistsTab: React.FC<PlaylistsTabProps> = ({
  playlists,
  videos,
  lang,
  onPlayVideo,
  favorites,
  onToggleFavorite,
  onShare,
  selectedPlaylistId: propPlaylistId,
  onClearSelectedPlaylist,
}) => {
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(propPlaylistId || null);
  const t = translations[lang];
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const currentPlaylist = playlists.find((p) => p.id === activePlaylistId);
  const playlistVideos = currentPlaylist
    ? (() => {
        const direct = videos.filter((v) => v.playlistId === currentPlaylist.id);
        if (direct.length > 0) return direct;
        // Fallback to title keywords match across the 360 videos
        const keywords = currentPlaylist.title.split(/[\s-]+/).filter((w) => w.length > 2);
        return videos.filter((v) =>
          keywords.some((kw) => v.title.toLowerCase().includes(kw.toLowerCase()))
        );
      })()
    : [];

  const handleSelectPlaylist = (id: string) => {
    sound.playClickTick();
    setActivePlaylistId(id);
  };

  const handleBackToPlaylists = () => {
    sound.playClickTick();
    setActivePlaylistId(null);
    if (onClearSelectedPlaylist) onClearSelectedPlaylist();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* If a playlist is selected, show detail view */}
      {currentPlaylist ? (
        <div className="space-y-6">
          {/* Back button */}
          <button
            onClick={handleBackToPlaylists}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 py-1"
          >
            <Arrow className="w-4 h-4" />
            <span>العودة لكل السلاسل</span>
          </button>

          {/* Playlist header banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 dark:border-orange-500/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-500 mb-1">
              <Layers className="w-4 h-4" />
              <span>سلسلة تعليمية متكاملة</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? currentPlaylist.title : currentPlaylist.titleEn || currentPlaylist.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              {lang === 'ar' ? currentPlaylist.description : currentPlaylist.descriptionEn || currentPlaylist.description}
            </p>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-3 tabular-nums">
              {playlistVideos.length} {t.videosInPlaylist}
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {playlistVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                lang={lang}
                onPlay={onPlayVideo}
                isFavorite={favorites.includes(video.id)}
                onToggleFavorite={onToggleFavorite}
                onShare={onShare}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Playlists List View */
        <div className="space-y-6">
          <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-500">
              <Layers className="w-4 h-4" />
              <span>Curated Courses & Series</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              {t.playlistsHeader}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.playlistsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playlists.map((pl) => {
              const matchedCount = videos.filter((v) => v.playlistId === pl.id).length;
              const count = matchedCount > 0 ? matchedCount : pl.videoCount || 8;
              return (
                <div
                  key={pl.id}
                  onClick={() => handleSelectPlaylist(pl.id)}
                  className="group rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 hover:border-orange-500/50 dark:hover:border-orange-500/50 p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col sm:flex-row gap-5"
                >
                  {/* Cover thumbnail */}
                  <div className="relative sm:w-44 aspect-video rounded-2xl bg-slate-900 overflow-hidden shrink-0">
                    <img
                      src={`https://img.youtube.com/vi/${pl.coverVideoId}/hqdefault.jpg`}
                      alt={pl.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-orange-500 text-white text-[11px] font-bold">
                        {count} مقاطع
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors leading-snug">
                        {lang === 'ar' ? pl.title : pl.titleEn || pl.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                        {lang === 'ar' ? pl.description : pl.descriptionEn || pl.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-orange-500">
                      <span>{t.explorePlaylist}</span>
                      <Arrow className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
