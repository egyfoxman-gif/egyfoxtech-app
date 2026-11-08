import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Language, ThemeMode, TabType } from '../types';
import { translations } from '../utils/i18n';
import { Sun, Moon, Bell, Globe, Youtube, Search } from 'lucide-react';
import { sound } from '../utils/sound';

interface TopHeaderProps {
  lang: Language;
  theme: ThemeMode;
  activeTab: TabType;
  unreadCount: number;
  onTabChange: (tab: TabType) => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onOpenNotifications: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onFocusSearch?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  lang,
  theme,
  activeTab,
  unreadCount,
  onTabChange,
  onToggleTheme,
  onToggleLanguage,
  onOpenNotifications,
  searchQuery = '',
  onSearchChange,
  onFocusSearch,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-[#080c14]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            sound.playClickTick();
            onTabChange('videos');
          }}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg text-left rtl:text-right shrink-0"
          title="Egyfox Technology"
        >
          <BrandLogo size="md" />
        </button>

        {/* Zone 2: Desktop Navigation Links + Search bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl gap-6">
          <nav className="flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => {
                sound.playClickTick();
                onTabChange('videos');
              }}
              className={`hover:text-orange-500 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'videos' ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              {t.tabVideos}
            </button>
            <button
              onClick={() => {
                sound.playClickTick();
                onTabChange('cards');
              }}
              className={`hover:text-orange-500 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'cards' ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              {lang === 'ar' ? 'البطاقات الافتراضية' : 'Virtual Cards'}
            </button>
            <button
              onClick={() => {
                sound.playClickTick();
                onTabChange('bybitpay');
              }}
              className={`hover:text-amber-500 transition-colors whitespace-nowrap shrink-0 py-1 font-medium ${
                activeTab === 'bybitpay' ? 'text-amber-500 font-bold' : ''
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>{lang === 'ar' ? 'باي بت باي' : 'Bybit Pay'}</span>
              </span>
            </button>
            <button
              onClick={() => {
                sound.playClickTick();
                onTabChange('converter');
              }}
              className={`hover:text-orange-500 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'converter' ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              {lang === 'ar' ? 'حاسبة العملات' : 'Currency'}
            </button>
            <button
              onClick={() => {
                sound.playClickTick();
                onTabChange('playlists');
              }}
              className={`hover:text-orange-500 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'playlists' ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              {t.tabPlaylists}
            </button>
            <button
              onClick={() => {
                sound.playClickTick();
                onTabChange('channel');
              }}
              className={`hover:text-orange-500 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'channel' ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              {t.tabChannel}
            </button>
          </nav>

          {/* Quick Search */}
          {onSearchChange && (
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={onFocusSearch}
                placeholder={t.searchPlaceholder}
                className="w-full h-9 ps-9 pe-4 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
              />
            </div>
          )}
        </div>

        {/* Zone 3: Actions (Language, Theme, Notifications, YouTube) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => {
              sound.playClickTick();
              onToggleLanguage();
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400 me-1" />
            <span className="uppercase">{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              sound.playClickTick();
              onToggleTheme();
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title={theme === 'dark' ? t.themeLight : t.themeDark}
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => {
              sound.playClickTick();
              onOpenNotifications();
            }}
            className="min-h-[44px] min-w-[44px] relative flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title={t.tabNotifications}
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute top-2 end-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
            )}
          </button>

          {/* YouTube Official Subscribe CTA */}
          <a
            href="https://www.youtube.com/channel/UC6a_Og9S6iLREt9uhIwWBUg?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>{t.subscribeBtn}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
