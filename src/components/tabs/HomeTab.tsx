import React from 'react';
import { Video, Playlist, Language } from '../../types';
import { translations } from '../../utils/i18n';
import { VideoCard } from '../VideoCard';
import { BrandLogo } from '../BrandLogo';
import { CHANNEL_INFO } from '../../data/initialData';
import {
  Play,
  Youtube,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  Eye,
  Film,
  CheckCircle,
  Bell,
} from 'lucide-react';
import { sound } from '../../utils/sound';

import { LiveUserSlider } from '../LiveUserSlider';

interface HomeTabProps {
  videos: Video[];
  playlists: Playlist[];
  lang: Language;
  onPlayVideo: (video: Video) => void;
  onNavigateVideos: () => void;
  onSelectPlaylist: (playlist: Playlist) => void;
  onOpenNotifications: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onShare: (video: Video) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  videos,
  playlists,
  lang,
  onPlayVideo,
  onNavigateVideos,
  onSelectPlaylist,
  onOpenNotifications,
  favorites,
  onToggleFavorite,
  onShare,
}) => {
  const t = translations[lang];
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const featuredVideo = videos.find((v) => v.isFeatured) || videos[0];
  const latestVideos = videos.slice(0, 4);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Live Users Counter Slider */}
      <LiveUserSlider lang={lang} />

      {/* Channel Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0d1424] to-[#1a1226] text-white p-6 sm:p-8 border border-slate-800 shadow-xl">
        {/* Ambient background glows */}
        <div className="absolute -top-24 -end-24 w-80 h-80 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -start-24 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>القناة التقنية الرسمية · Official Tech Channel</span>
            </div>

            <div className="flex items-center gap-3">
              <BrandLogo size="lg" showText={false} />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {CHANNEL_INFO.name}
                  </h1>
                  <CheckCircle className="w-5 h-5 text-orange-500 fill-orange-500/20" />
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {CHANNEL_INFO.nameAr} · {CHANNEL_INFO.country}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === 'ar' ? CHANNEL_INFO.bioAr : CHANNEL_INFO.bioEn}
            </p>

            {/* Quick stats strip */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="block text-lg sm:text-xl font-extrabold font-mono text-orange-400 tabular-nums">
                  {CHANNEL_INFO.subscribers}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.subscribersCount}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="block text-lg sm:text-xl font-extrabold font-mono text-amber-400 tabular-nums">
                  {CHANNEL_INFO.totalViews}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.totalViewsText}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="block text-lg sm:text-xl font-extrabold font-mono text-emerald-400 tabular-nums">
                  {CHANNEL_INFO.totalVideos}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.totalVideosText}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <a
              href={CHANNEL_INFO.youtubeSubscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 lg:flex-initial px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all active:scale-95"
            >
              <Youtube className="w-5 h-5 fill-white" />
              <span>{t.subscribeBtn}</span>
            </a>

            <button
              onClick={() => {
                sound.playClickTick();
                onOpenNotifications();
              }}
              className="flex-1 lg:flex-initial px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 border border-white/10 transition-all"
            >
              <Bell className="w-4 h-4 text-orange-400" />
              <span>{t.tabNotifications}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Video Spotlight */}
      {featuredVideo && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t.featuredVideo}
              </h2>
            </div>
            <button
              onClick={() => {
                sound.playClickTick();
                onNavigateVideos();
              }}
              className="text-xs font-semibold text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
            >
              <span>{t.seeAllVideos}</span>
              <Arrow className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            onClick={() => {
              sound.playClickTick();
              onPlayVideo(featuredVideo);
            }}
            className="group relative rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 hover:border-orange-500/50 dark:hover:border-orange-500/50 shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Thumbnail side */}
            <div className="lg:col-span-7 relative aspect-video bg-black overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${featuredVideo.id}/maxresdefault.jpg`}
                alt={featuredVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-115 active:scale-95 transition-all">
                  <Play className="w-8 h-8 fill-white ms-1" />
                </div>
              </div>

              <span className="absolute bottom-3 end-3 px-2.5 py-1 rounded-lg bg-black/80 text-xs font-mono font-medium text-white tabular-nums">
                {featuredVideo.duration}
              </span>
            </div>

            {/* Info side */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-orange-500 font-semibold mb-2">
                  <span>{featuredVideo.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500 dark:text-slate-400">مميز لهذا الشهر</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors leading-snug">
                  {lang === 'ar' ? featuredVideo.title : featuredVideo.titleEn || featuredVideo.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mt-3 leading-relaxed">
                  {lang === 'ar' ? featuredVideo.description : featuredVideo.descriptionEn || featuredVideo.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="tabular-nums font-semibold text-slate-900 dark:text-slate-200">
                    {featuredVideo.views}
                  </span>{' '}
                  {t.viewsCount}
                </div>

                <span className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-500 text-white shadow-sm inline-flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{t.watchNow}</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Uploads */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {t.latestUploads}
          </h2>
          <button
            onClick={() => {
              sound.playClickTick();
              onNavigateVideos();
            }}
            className="text-xs font-semibold text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
          >
            <span>{t.seeAllVideos}</span>
            <Arrow className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {latestVideos.map((video) => (
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
      </section>

      {/* Featured Playlists Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {t.popularPlaylists}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => {
                sound.playClickTick();
                onSelectPlaylist(pl);
              }}
              className="group p-4 rounded-2xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 hover:border-orange-500/50 dark:hover:border-orange-500/50 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden mb-3">
                  <img
                    src={`https://img.youtube.com/vi/${pl.coverVideoId}/hqdefault.jpg`}
                    alt={pl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 text-white text-xs font-bold">
                      {pl.videoCount} مقطع
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
                  {lang === 'ar' ? pl.title : pl.titleEn || pl.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {lang === 'ar' ? pl.description : pl.descriptionEn || pl.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-orange-500">
                <span>{t.explorePlaylist}</span>
                <Arrow className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
