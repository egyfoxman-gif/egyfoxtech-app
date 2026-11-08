import React, { useState, useEffect } from 'react';
import { ChannelNotification, Video, Language } from '../../types';
import { translations } from '../../utils/i18n';
import { sound } from '../../utils/sound';
import {
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  CheckCheck,
  Trash2,
  Play,
  Sparkles,
  Send,
  Video as VideoIcon,
} from 'lucide-react';

interface NotificationsTabProps {
  notifications: ChannelNotification[];
  videos: Video[];
  lang: Language;
  onPlayVideoById: (videoId: string) => void;
  onMarkAllRead: () => void;
  onClearNotifications: () => void;
  onMarkAsRead: (id: string) => void;
  onTriggerTestNotification: () => void;
  onCheckNewUploads?: () => void;
  onShowToast: (msg: string) => void;
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({
  notifications,
  videos,
  lang,
  onPlayVideoById,
  onMarkAllRead,
  onClearNotifications,
  onMarkAsRead,
  onTriggerTestNotification,
  onCheckNewUploads,
  onShowToast,
}) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleRequestPermission = async () => {
    sound.playClickTick();
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPermission(result);
        if (result === 'granted') {
          sound.playNotificationChime();
          onShowToast(t.notifsEnabled);
          try {
            new Notification('Egyfox Technology 🦊', {
              body: 'تم تفعيل إشعارات الفيديوهات الجديدة بنجاح!',
              icon: 'https://img.youtube.com/vi/DPnqb74SmKg/hqdefault.jpg',
            });
          } catch {
            // Some mobile browsers ignore Notification constructor
          }
        }
      } catch (e) {
        console.warn('Notification permission error', e);
      }
    } else {
      onShowToast('التنبيهات غير مدعومة في هذا المتصفح');
    }
  };

  const handleToggleSound = () => {
    sound.playClickTick();
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      sound.playNotificationChime();
    }
  };

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'الآن';
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    return `منذ ${days} يوم`;
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-500">
          <Bell className="w-4 h-4" />
          <span>Instant Alerts & Updates</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          {t.notifHeader}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.notifSubtitle}
        </p>
      </div>

      {/* Permission Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 dark:border-orange-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {t.notifPermissionTitle}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-md">
              {t.notifPermissionDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="min-h-[44px] px-3.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
            title={soundEnabled ? t.soundOn : t.soundOff}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-orange-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
            <span>{soundEnabled ? t.soundOn : t.soundOff}</span>
          </button>

          {/* Permission Button */}
          {permission === 'granted' ? (
            <span className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              {t.notifsEnabled}
            </span>
          ) : (
            <button
              onClick={handleRequestPermission}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/20 transition-all active:scale-95 whitespace-nowrap"
            >
              {t.enableNotifs}
            </button>
          )}
        </div>
      </div>

      {/* Live Channel Upload Checker & Simulator */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              نظام استشعار الحلقات الجديدة لقناة EgyFox Technology
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              يتم إرسال إشعار فوري لجميع المستخدمين فور رفع أي فيديو على القناة
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onCheckNewUploads && (
            <button
              onClick={() => {
                if (soundEnabled) sound.playClickTick();
                onCheckNewUploads();
              }}
              className="min-h-[40px] px-3.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>فحص جديد القناة الآن</span>
            </button>
          )}

          <button
            onClick={() => {
              if (soundEnabled) sound.playNotificationChime();
              onTriggerTestNotification();
            }}
            className="min-h-[40px] px-3.5 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-orange-400" />
            <span>تجربة الرنين</span>
          </button>
        </div>
      </div>

      {/* Notification List Toolbar */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          سجل التنبيهات ({notifications.length})
        </span>

        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <>
              <button
                onClick={() => {
                  sound.playClickTick();
                  onMarkAllRead();
                }}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-orange-500 inline-flex items-center gap-1 p-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>{t.markAllRead}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClickTick();
                  onClearNotifications();
                }}
                className="text-xs font-semibold text-slate-400 hover:text-red-500 inline-flex items-center gap-1 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearNotifs}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Notifications Cards */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const relatedVideo = notif.videoId ? videos.find((v) => v.id === notif.videoId) : null;
            return (
              <div
                key={notif.id}
                onClick={() => {
                  sound.playClickTick();
                  onMarkAsRead(notif.id);
                  if (notif.videoId) {
                    onPlayVideoById(notif.videoId);
                  }
                }}
                className={`group p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  notif.isRead
                    ? 'bg-white/60 dark:bg-[#0f1523]/60 border-slate-200/60 dark:border-slate-800/60'
                    : 'bg-white dark:bg-[#0f1523] border-orange-500/40 shadow-sm'
                }`}
              >
                {/* Icon or Thumbnail */}
                {relatedVideo ? (
                  <div className="relative w-16 sm:w-20 aspect-video rounded-xl bg-slate-900 overflow-hidden shrink-0 mt-0.5">
                    <img
                      src={`https://img.youtube.com/vi/${relatedVideo.id}/hqdefault.jpg`}
                      alt={notif.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                    <VideoIcon className="w-5 h-5" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
                      {lang === 'ar' ? notif.title : notif.titleEn || notif.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {formatTime(notif.timestamp)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {lang === 'ar' ? notif.body : notif.bodyEn || notif.body}
                  </p>

                  {notif.videoId && (
                    <div className="mt-2 text-xs font-semibold text-orange-500 inline-flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" />
                      <span>اضغط للمشاهدة فوراً داخل التطبيق</span>
                    </div>
                  )}
                </div>

                {/* Unread indicator */}
                {!notif.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 px-4 text-center rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <Bell className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t.emptyNotifs}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
            ستصلك التنبيهات هنا فور رفع أي مقطع فيديو جديد على قناة Egyfox Technology.
          </p>
        </div>
      )}
    </div>
  );
};
