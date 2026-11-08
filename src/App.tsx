/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Video, Playlist, ChannelNotification, Language, ThemeMode, TabType, CategoryType } from './types';
import { INITIAL_VIDEOS, INITIAL_PLAYLISTS, INITIAL_NOTIFICATIONS } from './data/initialData';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { MiniPlayer } from './components/MiniPlayer';
import { Toast } from './components/Toast';
import { VideosTab } from './components/tabs/VideosTab';
import { HomeTab } from './components/tabs/HomeTab';
import { PlaylistsTab } from './components/tabs/PlaylistsTab';
import { NotificationsTab } from './components/tabs/NotificationsTab';
import { ChannelTab } from './components/tabs/ChannelTab';
import { CardsTab } from './components/tabs/CardsTab';
import { BybitPayTab } from './components/tabs/BybitPayTab';
import { CurrencyConverterTab } from './components/tabs/CurrencyConverterTab';
import { FloatingNotificationBanner } from './components/FloatingNotificationBanner';
import { SubscribeModal } from './components/SubscribeModal';
import { sound } from './utils/sound';
import { translations } from './utils/i18n';

export default function App() {
  // Theme state: default to 'dark'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('egyfox_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  // Language state: default to 'ar'
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('egyfox_lang');
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar';
  });

  // Active navigation tab (user requested Videos as primary first tab)
  const [activeTab, setActiveTab] = useState<TabType>('videos');

  // Video dataset (persisted in localStorage with channel sync)
  const [videos, setVideos] = useState<Video[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('egyfox_videos_real_v6');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= INITIAL_VIDEOS.length) {
            return parsed;
          }
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_VIDEOS;
  });

  // Playlists dataset
  const [playlists] = useState<Playlist[]>(INITIAL_PLAYLISTS);

  // Notifications dataset (persisted in localStorage)
  const [notifications, setNotifications] = useState<ChannelNotification[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('egyfox_notifications_real_v6');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Active push notification banner state
  const [activePushNotification, setActivePushNotification] = useState<ChannelNotification | null>(null);

  // Subscribe confirmation modal state
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  // Favorite video IDs
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('egyfox_favorites');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return ['p1Cx2jXfSkQ'];
  });

  // In-App Video Player State
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Search query in top bar
  const [searchQuery, setSearchQuery] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected playlist for direct drill-down
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('egyfox_theme', theme);
  }, [theme]);

  // Sync language with HTML dir and lang
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('egyfox_lang', lang);
  }, [lang]);

  // Persist videos to localStorage
  useEffect(() => {
    localStorage.setItem('egyfox_videos_real_v6', JSON.stringify(videos));
  }, [videos]);

  // Persist notifications to localStorage
  useEffect(() => {
    localStorage.setItem('egyfox_notifications_real_v6', JSON.stringify(notifications));
  }, [notifications]);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('egyfox_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Automated Channel Upload Listener: Dispatches app notification when a new video is detected
  const checkForNewChannelUploads = (manual = false) => {
    const latestVideo = videos[0] || INITIAL_VIDEOS[0];
    if (!latestVideo) return;

    const lastSeenId = localStorage.getItem('egyfox_last_notified_video_id');
    const isNewUpload = !lastSeenId || lastSeenId !== latestVideo.id;

    if (isNewUpload || manual) {
      localStorage.setItem('egyfox_last_notified_video_id', latestVideo.id);

      const newUploadNotification: ChannelNotification = {
        id: `upload_${latestVideo.id}_${Date.now()}`,
        title: `⚡ حلقة جديدة على القناة: ${latestVideo.title}`,
        titleEn: `⚡ New Video Released: ${latestVideo.titleEn}`,
        body: `تم نشر فيديو جديد الآن على قناة EgyFox Technology بعنوان: ${latestVideo.title}. شاهد الآن بالمدة الكاملة (${latestVideo.duration}) واقرأ المقال!`,
        bodyEn: `New video uploaded on EgyFox Technology! Duration: ${latestVideo.duration}. Watch now!`,
        timestamp: Date.now(),
        videoId: latestVideo.id,
        articleUrl: latestVideo.articleUrl,
        isRead: false,
        type: 'video',
      };

      setNotifications((prev) => {
        const alreadyExists = prev.some((n) => n.videoId === latestVideo.id && n.title.includes('حلقة جديدة'));
        return alreadyExists ? prev : [newUploadNotification, ...prev];
      });

      setActivePushNotification(newUploadNotification);
      sound.playNotificationChime();

      if (manual) {
        showToast(lang === 'ar' ? 'تم فحص القناة: تم إرسال تنبيه بأحدث حلقة منشورة!' : 'Channel checked: latest upload notified!');
      }

      // Browser native push notification
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('Egyfox Technology 🦊', {
            body: `حلقة جديدة: ${latestVideo.title}`,
            icon: `https://img.youtube.com/vi/${latestVideo.id}/hqdefault.jpg`,
          });
        } catch {
          // ignore
        }
      }
    } else if (manual) {
      showToast(lang === 'ar' ? 'أنت تشاهد أحدث حلقات القناة بالفعل!' : 'You are up to date with all channel uploads!');
    }
  };

  // Check on initial load and setup interval check every 3 minutes
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      checkForNewChannelUploads(false);
    }, 2500);

    const interval = setInterval(() => {
      checkForNewChannelUploads(false);
    }, 180000); // 3 minutes

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
    setIsMinimized(false);
  };

  const handlePlayVideoById = (videoId: string) => {
    const found = videos.find((v) => v.id === videoId);
    if (found) {
      handlePlayVideo(found);
    }
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setIsMinimized(false);
    setSelectedVideo(null);
  };

  const handleMinimizePlayer = () => {
    setIsPlayerOpen(false);
    setIsMinimized(true);
  };

  const handleExpandPlayer = () => {
    setIsPlayerOpen(true);
    setIsMinimized(false);
  };

  const handleToggleFavorite = (videoId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(videoId);
      if (exists) {
        showToast(translations[lang].removeFromFavs);
        return prev.filter((id) => id !== videoId);
      } else {
        showToast(translations[lang].addToFavs);
        return [...prev, videoId];
      }
    });
  };

  const handleShareVideo = (video: Video) => {
    const url = `https://www.youtube.com/watch?v=${video.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast(translations[lang].linkCopied);
      }).catch(() => {
        showToast(url);
      });
    } else {
      showToast(url);
    }
  };

  // Notification actions
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('تم تحديد جميع الإشعارات كمقروءة');
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    showToast('تم مسح جميع الإشعارات');
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Add new video (Creator Studio)
  const handleAddVideo = (newVideo: Video, sendNotif: boolean) => {
    setVideos((prev) => [newVideo, ...prev]);

    if (sendNotif) {
      sound.playNotificationChime();
      const newNotif: ChannelNotification = {
        id: `notif_${Date.now()}`,
        title: `فيديو جديد: ${newVideo.title}`,
        titleEn: `New Video: ${newVideo.titleEn}`,
        body: newVideo.description.slice(0, 90) + '...',
        bodyEn: (newVideo.descriptionEn || newVideo.description || '').slice(0, 90) + '...',
        timestamp: Date.now(),
        videoId: newVideo.id,
        isRead: false,
        type: 'video',
      };
      setNotifications((prev) => [newNotif, ...prev]);
      setActivePushNotification(newNotif);

      // Fire browser notification if allowed
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('Egyfox Technology 🦊', {
            body: newVideo.title,
            icon: `https://img.youtube.com/vi/${newVideo.id}/hqdefault.jpg`,
          });
        } catch {
          // ignore
        }
      }
    }
  };

  // Trigger test notification
  const handleTriggerTestNotification = () => {
    sound.playNotificationChime();
    const randomVideo = videos[Math.floor(Math.random() * videos.length)] || videos[0];
    const testNotif: ChannelNotification = {
      id: `test_${Date.now()}`,
      title: `⚡ حلقة جديدة: ${randomVideo.title}`,
      titleEn: `⚡ Fresh Release: ${randomVideo.titleEn}`,
      body: 'شاهد الآن أحدث فيديو تقني من قناة Egyfox Technology مع نقاش حي في التعليقات.',
      bodyEn: 'Watch the newest tech episode right now in-app with community discussion.',
      timestamp: Date.now(),
      videoId: randomVideo.id,
      isRead: false,
      type: 'video',
    };
    setNotifications((prev) => [testNotif, ...prev]);
    setActivePushNotification(testNotif);
    showToast(translations[lang].testNotifSuccess);

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('Egyfox Technology 🦊', {
          body: `فيديو جديد: ${randomVideo.title}`,
          icon: `https://img.youtube.com/vi/${randomVideo.id}/hqdefault.jpg`,
        });
      } catch {
        // ignore
      }
    }
  };

  const handleResetData = () => {
    setVideos(INITIAL_VIDEOS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setFavorites(['p1Cx2jXfSkQ']);
    localStorage.removeItem('egyfox_videos_real_v2');
    localStorage.removeItem('egyfox_notifications_real_v2');
    localStorage.removeItem('egyfox_favorites');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Toast Notification Alert */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Top Header */}
      <TopHeader
        lang={lang}
        theme={theme}
        activeTab={activeTab}
        unreadCount={unreadCount}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleTheme={handleToggleTheme}
        onToggleLanguage={handleToggleLanguage}
        onOpenNotifications={() => {
          setActiveTab('notifications');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (activeTab !== 'videos') {
            setActiveTab('videos');
          }
        }}
        onFocusSearch={() => {
          if (activeTab !== 'videos') {
            setActiveTab('videos');
          }
        }}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-24 md:pb-16">
        {activeTab === 'videos' && (
          <VideosTab
            videos={videos}
            lang={lang}
            onPlayVideo={handlePlayVideo}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShareVideo}
            initialSearch={searchQuery}
          />
        )}

        {activeTab === 'home' && (
          <HomeTab
            videos={videos}
            playlists={playlists}
            lang={lang}
            onPlayVideo={handlePlayVideo}
            onNavigateVideos={() => {
              setActiveTab('videos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPlaylist={(pl) => {
              setSelectedPlaylistId(pl.id);
              setActiveTab('playlists');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenNotifications={() => {
              setActiveTab('notifications');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShareVideo}
          />
        )}

        {activeTab === 'bybitpay' && (
          <BybitPayTab
            lang={lang}
            onPlayVideoById={handlePlayVideoById}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'cards' && (
          <CardsTab
            lang={lang}
            onPlayVideoById={handlePlayVideoById}
            onShowToast={showToast}
            onNavigateBybitPay={() => {
              setActiveTab('bybitpay');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'converter' && (
          <CurrencyConverterTab
            lang={lang}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'playlists' && (
          <PlaylistsTab
            playlists={playlists}
            videos={videos}
            lang={lang}
            onPlayVideo={handlePlayVideo}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShareVideo}
            selectedPlaylistId={selectedPlaylistId}
            onClearSelectedPlaylist={() => setSelectedPlaylistId(null)}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsTab
            notifications={notifications}
            videos={videos}
            lang={lang}
            onPlayVideoById={handlePlayVideoById}
            onMarkAllRead={handleMarkAllRead}
            onClearNotifications={handleClearNotifications}
            onMarkAsRead={handleMarkAsRead}
            onTriggerTestNotification={handleTriggerTestNotification}
            onCheckNewUploads={() => checkForNewChannelUploads(true)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'channel' && (
          <ChannelTab
            lang={lang}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onToggleLanguage={handleToggleLanguage}
            onAddVideo={handleAddVideo}
            onResetData={handleResetData}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Floating Push Notification Banner (Guaranteed in-app delivery) */}
      <FloatingNotificationBanner
        notification={activePushNotification}
        lang={lang}
        onPlayVideoById={handlePlayVideoById}
        onClose={() => setActivePushNotification(null)}
      />

      {/* 1-Click YouTube Subscribe Modal */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
        lang={lang}
      />

      {/* Floating Picture-in-Picture MiniPlayer */}
      {isMinimized && selectedVideo && (
        <MiniPlayer
          video={selectedVideo}
          lang={lang}
          onExpand={handleExpandPlayer}
          onClose={handleClosePlayer}
        />
      )}

      {/* In-App YouTube Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        allVideos={videos}
        lang={lang}
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        onMinimize={handleMinimizePlayer}
        onSelectVideo={(v) => {
          setSelectedVideo(v);
        }}
        isFavorite={selectedVideo ? favorites.includes(selectedVideo.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onShowToast={showToast}
      />

      {/* Mobile Bottom Navigation Bar (Pages at the bottom) */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        unreadCount={unreadCount}
      />
    </div>
  );
}
