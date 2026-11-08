import React, { useState } from 'react';
import { Video, Language } from '../types';
import { translations } from '../utils/i18n';
import { getYouTubeThumbnail, getYouTubeWatchUrl } from '../utils/youtube';
import { Play, Bookmark, BookmarkCheck, Share2, ExternalLink, BookOpen } from 'lucide-react';
import { sound } from '../utils/sound';

interface VideoCardProps {
  video: Video;
  lang: Language;
  onPlay: (video: Video) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (videoId: string) => void;
  onShare?: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  lang,
  onPlay,
  isFavorite = false,
  onToggleFavorite,
  onShare,
}) => {
  const [imgError, setImgError] = useState(false);
  const t = translations[lang];

  const title = lang === 'ar' ? video.title : video.titleEn || video.title;
  const description = lang === 'ar' ? video.description : video.descriptionEn || video.description;

  const categoryNames: Record<string, string> = {
    all: t.catAll,
    cards: t.catCards,
    ebanks: t.catEbanks,
    instapay: t.catInstapay,
    investing: t.catInvesting,
    freelance: t.catFreelance,
    tutorials: t.catTutorials,
  };

  const categoryLabel = categoryNames[video.category] || video.category;
  const thumbnailSrc = video.thumbnailUrl || (imgError ? getYouTubeThumbnail(video.id, 'hq') : getYouTubeThumbnail(video.id, 'max'));

  // Ensure clean views string without double "مشاهدة"
  const formattedViews = video.views.includes('مشاهدة') || video.views.includes('views')
    ? video.views
    : `${video.views} ${t.viewsCount}`;

  return (
    <article className="group flex flex-col rounded-2xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden">
      {/* Thumbnail with duration badge and play hover */}
      <div
        className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-pointer"
        onClick={() => {
          sound.playClickTick();
          onPlay(video);
        }}
      >
        <img
          src={thumbnailSrc}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Center play icon on hover / mobile touch */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 active:scale-95 transition-all duration-200">
            <Play className="w-6 h-6 fill-white ms-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 end-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[11px] font-mono font-medium text-white tabular-nums">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3
          onClick={() => {
            sound.playClickTick();
            onPlay(video);
          }}
          className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2 hover:text-orange-500 transition-colors cursor-pointer leading-snug"
        >
          {title}
        </h3>

        {/* Clean Unboxed Metadata (Zero-Pill discipline) */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span className="font-semibold text-orange-600 dark:text-orange-400">{categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums font-medium">{formattedViews}</span>
          <span aria-hidden="true">·</span>
          <span>{video.publishedAt}</span>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed flex-1">
          {description}
        </p>

        {/* Read Article on Website Button (Requested by user) */}
        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <a
            href={video.articleUrl || 'https://www.egyfoxtech.com'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-1.5 px-3 rounded-xl bg-orange-50/80 dark:bg-orange-950/20 hover:bg-orange-100 dark:hover:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/40 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>{lang === 'ar' ? 'قراءة المقالة على الموقع' : 'Read Full Article'}</span>
          </a>

          {/* Action toolbar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                sound.playClickTick();
                onPlay(video);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors py-1"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t.playInApp}</span>
            </button>

            <div className="flex items-center gap-1">
              {/* Share / Copy */}
              {onShare && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClickTick();
                    onShare(video);
                  }}
                  className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                  title={t.shareVideo}
                  aria-label="Share video"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}

              {/* Favorite */}
              {onToggleFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playClickTick();
                    onToggleFavorite(video.id);
                  }}
                  className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors ${
                    isFavorite
                      ? 'text-orange-500 bg-orange-50 dark:bg-orange-950/30'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                  title={isFavorite ? t.removeFromFavs : t.addToFavs}
                  aria-label="Bookmark video"
                >
                  {isFavorite ? (
                    <BookmarkCheck className="w-4 h-4 fill-current" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* Open on YouTube */}
              <a
                href={getYouTubeWatchUrl(video.id)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                title={t.openOnYoutube}
                aria-label="Open on YouTube"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
