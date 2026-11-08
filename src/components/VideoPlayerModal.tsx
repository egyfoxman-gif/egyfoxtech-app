import React, { useEffect, useState } from 'react';
import { Video, Language } from '../types';
import { translations } from '../utils/i18n';
import { getYouTubeEmbedUrl, getYouTubeWatchUrl } from '../utils/youtube';
import { BrandLogo } from './BrandLogo';
import {
  X,
  Minimize2,
  Share2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  ThumbsUp,
  Eye,
  Youtube,
  Check,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface VideoPlayerModalProps {
  video: Video | null;
  allVideos: Video[];
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onSelectVideo: (video: Video) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (videoId: string) => void;
  onShowToast: (msg: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  allVideos,
  lang,
  isOpen,
  onClose,
  onMinimize,
  onSelectVideo,
  isFavorite = false,
  onToggleFavorite,
  onShowToast,
}) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [liked, setLiked] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  const title = lang === 'ar' ? video.title : video.titleEn || video.title;
  const description = lang === 'ar' ? video.description : video.descriptionEn || video.description;
  const embedUrl = getYouTubeEmbedUrl(video.id, true);

  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id)
    .slice(0, 4);

  const handleCopyLink = () => {
    sound.playClickTick();
    const url = getYouTubeWatchUrl(video.id);
    navigator.clipboard.writeText(url).then(() => {
      onShowToast(t.linkCopied);
    }).catch(() => {
      onShowToast(url);
    });
  };

  const handleLike = () => {
    sound.playClickTick();
    setLiked(!liked);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0b101b] rounded-none md:rounded-3xl shadow-2xl border-0 md:border border-slate-200/80 dark:border-slate-800/80 overflow-hidden my-auto max-h-screen md:max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0d1422]/80 backdrop-blur-xs shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <BrandLogo size="sm" showText={false} />
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
              Egyfox Technology
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Minimize button (PIP) */}
            <button
              onClick={() => {
                sound.playClickTick();
                onMinimize();
              }}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title={t.minimizePlayer}
              aria-label="Minimize video"
            >
              <Minimize2 className="w-4 h-4" />
            </button>

            {/* Share / Copy link */}
            <button
              onClick={handleCopyLink}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title={t.shareVideo}
              aria-label="Copy link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Close modal */}
            <button
              onClick={() => {
                sound.playClickTick();
                onClose();
              }}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors"
              title={t.closePlayer}
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player & Scrollable Content Area */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/* Responsive 16:9 iframe embed */}
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Video Metadata & Actions */}
          <div className="p-4 sm:p-6 space-y-5">
            {/* Title & stats */}
            <div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {title}
              </h2>
              <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span className="font-semibold text-orange-500">{video.category}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 tabular-nums">
                  <Eye className="w-3.5 h-3.5" />
                  {video.views} {t.viewsCount}
                </span>
                <span aria-hidden="true">·</span>
                <span>{video.publishedAt}</span>
              </div>
            </div>

            {/* Interaction Row (Channel Bar & Buttons) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              {/* Channel Profile */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-sm">
                  <img
                    src="/assets/aistudio/image_ed688a81.png"
                    alt="EgyFox Technology"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    EgyFox Technology - أحمد خضر
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    120K+ {t.subscribersCount}
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/channel/UC6a_Og9S6iLREt9uhIwWBUg?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all inline-flex items-center gap-1 shadow-sm active:scale-95"
                >
                  <Youtube className="w-3.5 h-3.5 fill-white" />
                  <span>{t.subscribeBtn}</span>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Read Article on Website Button */}
                <a
                  href={video.articleUrl || 'https://www.egyfoxtech.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-bold bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 transition-colors inline-flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <span>{lang === 'ar' ? 'قراءة المقالة على الموقع' : 'Read Full Article'}</span>
                </a>

                <button
                  onClick={handleLike}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                    liked
                      ? 'bg-orange-500 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span className="tabular-nums">{liked ? 'أعجبك' : video.likes}</span>
                </button>

                {onToggleFavorite && (
                  <button
                    onClick={() => {
                      sound.playClickTick();
                      onToggleFavorite(video.id);
                    }}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                      isFavorite
                        ? 'bg-orange-500 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {isFavorite ? (
                      <BookmarkCheck className="w-4 h-4 fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                    <span>{isFavorite ? t.inFavorites : t.addToFavs}</span>
                  </button>
                )}

                <a
                  href={getYouTubeWatchUrl(video.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t.openOnYoutube}</span>
                </a>
              </div>
            </div>

            {/* Description accordion */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
              <p className={`text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed ${!showFullDesc ? 'line-clamp-2' : ''}`}>
                {description}
              </p>
              
              {/* Tags */}
              {showFullDesc && video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="mt-2 text-xs font-semibold text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
              >
                {showFullDesc ? (
                  <>
                    <span>إخفاء التفاصيل</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>قراءة المزيد</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Related Videos List */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                {t.relatedVideos}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedVideos.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      sound.playClickTick();
                      onSelectVideo(item);
                    }}
                    className="flex gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0f1523] border border-slate-200/60 dark:border-slate-800/60 hover:border-orange-500/50 cursor-pointer transition-all"
                  >
                    <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-800 shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-1 end-1 px-1 py-0.2 rounded text-[10px] font-mono bg-black/80 text-white">
                        {item.duration}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                        {lang === 'ar' ? item.title : item.titleEn || item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.views} {t.viewsCount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
