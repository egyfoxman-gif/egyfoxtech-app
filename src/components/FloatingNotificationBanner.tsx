import React, { useEffect } from 'react';
import { ChannelNotification, Language } from '../types';
import { translations } from '../utils/i18n';
import { Play, X, BellRing, BookOpen } from 'lucide-react';
import { sound } from '../utils/sound';

interface FloatingNotificationBannerProps {
  notification: ChannelNotification | null;
  lang: Language;
  onWatch?: (videoId: string) => void;
  onPlayVideoById?: (videoId: string) => void;
  onDismiss?: () => void;
  onClose?: () => void;
}

export const FloatingNotificationBanner: React.FC<FloatingNotificationBannerProps> = ({
  notification,
  lang,
  onWatch,
  onPlayVideoById,
  onDismiss,
  onClose,
}) => {
  const handleWatch = (id: string) => {
    if (onPlayVideoById) onPlayVideoById(id);
    else if (onWatch) onWatch(id);
  };

  const handleDismiss = () => {
    if (onClose) onClose();
    else if (onDismiss) onDismiss();
  };
  useEffect(() => {
    if (notification) {
      sound.playNotificationChime();
      const timer = setTimeout(() => {
        handleDismiss();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification) return null;

  const t = translations[lang];
  const title = lang === 'ar' ? notification.title : notification.titleEn || notification.title;
  const body = lang === 'ar' ? notification.body : notification.bodyEn || notification.body;

  return (
    <aside
      aria-label="Push Alert"
      className="fixed top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-50 w-[94vw] max-w-md rounded-2xl bg-white/95 dark:bg-[#0f1523]/95 backdrop-blur-md border border-orange-500/50 shadow-2xl p-3.5 animate-in slide-in-from-top-6 duration-300 flex items-start gap-3"
    >
      {/* Icon or Thumbnail */}
      {notification.videoId ? (
        <div
          onClick={() => {
            sound.playClickTick();
            handleWatch(notification.videoId!);
            handleDismiss();
          }}
          className="relative w-16 aspect-video rounded-xl bg-slate-900 overflow-hidden shrink-0 cursor-pointer group mt-0.5"
        >
          <img
            src={`https://img.youtube.com/vi/${notification.videoId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-4 h-4 fill-white text-white" />
          </div>
        </div>
      ) : (
        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
          <BellRing className="w-5 h-5" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
            EgyFox Technology · إشعار فوري
          </span>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <h4
          onClick={() => {
            if (notification.videoId) {
              sound.playClickTick();
              handleWatch(notification.videoId);
              handleDismiss();
            }
          }}
          className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-orange-500 cursor-pointer mt-0.5"
        >
          {title}
        </h4>

        <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
          {body}
        </p>

        {/* Action button */}
        {notification.videoId && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => {
                sound.playClickTick();
                handleWatch(notification.videoId!);
                handleDismiss();
              }}
              className="px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold inline-flex items-center gap-1 shadow-xs transition-colors"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>مشاهدة فوراً</span>
            </button>

            {notification.articleUrl && (
              <a
                href={notification.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold inline-flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3 text-orange-500" />
                <span>المقالة</span>
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
