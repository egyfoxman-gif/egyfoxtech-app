import React, { useState } from 'react';
import { Video, CategoryType, Language, ThemeMode } from '../../types';
import { translations } from '../../utils/i18n';
import { CHANNEL_INFO } from '../../data/initialData';
import { BrandLogo } from '../BrandLogo';
import { extractYouTubeId, getYouTubeThumbnail } from '../../utils/youtube';
import { sound } from '../../utils/sound';
import {
  Youtube,
  PlusCircle,
  ExternalLink,
  Globe,
  Sun,
  Moon,
  RotateCcw,
  Send,
  CheckCircle2,
  AlertCircle,
  Share2,
  Sparkles,
  Smartphone,
  Cpu,
} from 'lucide-react';

interface ChannelTabProps {
  lang: Language;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onAddVideo?: (video: Video, sendNotif: boolean) => void;
  onResetData: () => void;
  onShowToast: (msg: string) => void;
}

export const ChannelTab: React.FC<ChannelTabProps> = ({
  lang,
  theme,
  onToggleTheme,
  onToggleLanguage,
  onResetData,
  onShowToast,
}) => {
  const t = translations[lang];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Channel Bio Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <BrandLogo size="lg" showText={false} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {CHANNEL_INFO.name}
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                Verified
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {CHANNEL_INFO.nameAr} · {CHANNEL_INFO.country}
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-3 max-w-2xl leading-relaxed">
              {lang === 'ar' ? CHANNEL_INFO.bioAr : CHANNEL_INFO.bioEn}
            </p>
          </div>
        </div>

        <a
          href={CHANNEL_INFO.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md shadow-red-600/20 transition-all active:scale-95 shrink-0"
        >
          <Youtube className="w-5 h-5 fill-white" />
          <span>{t.subscribeBtn}</span>
        </a>
      </div>

      {/* Official Social Links */}
      <section className="p-6 rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          {t.officialLinks}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* 1. Official Website */}
          <a
            href={CHANNEL_INFO.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/30 dark:hover:text-orange-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Globe className="w-4 h-4 text-orange-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">موقعنا الرسمي</span>
              <span className="text-[10px] text-slate-400 font-mono">egyfoxtech.com</span>
            </div>
          </a>

          {/* 2. YouTube Official */}
          <a
            href={CHANNEL_INFO.youtubeSubscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Youtube className="w-4 h-4 text-red-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">قناة اليوتيوب</span>
              <span className="text-[10px] text-slate-400 font-mono">@EgyFoxTechnology</span>
            </div>
          </a>

          {/* 3. Economy Game Channel */}
          <a
            href={CHANNEL_INFO.economyGameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Youtube className="w-4 h-4 text-red-600 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">لعبة الأقتصاد</span>
              <span className="text-[10px] text-slate-400">قناتنا الثانية 🎮</span>
            </div>
          </a>

          {/* 4. TikTok */}
          <a
            href={CHANNEL_INFO.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 hover:text-orange-500 dark:hover:bg-slate-800 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Smartphone className="w-4 h-4 text-pink-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">TikTok تيك توك</span>
              <span className="text-[10px] text-slate-400 font-mono">@egyfox.technology</span>
            </div>
          </a>

          {/* 5. Facebook Page */}
          <a
            href={CHANNEL_INFO.facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Share2 className="w-4 h-4 text-blue-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">صفحة فيسبوك</span>
              <span className="text-[10px] text-slate-400">Egyfox Technology</span>
            </div>
          </a>

          {/* 6. Facebook Group */}
          <a
            href={CHANNEL_INFO.facebookGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Share2 className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">جروب فيسبوك</span>
              <span className="text-[10px] text-slate-400">egyfoxtechno</span>
            </div>
          </a>

          {/* 7. Telegram */}
          <a
            href={CHANNEL_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950/30 dark:hover:text-sky-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Send className="w-4 h-4 text-sky-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">تيليجرام القناة</span>
              <span className="text-[10px] text-slate-400 font-mono">t.me/egyfoxtechnology</span>
            </div>
          </a>

          {/* 8. Instagram */}
          <a
            href={CHANNEL_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-950/30 dark:hover:text-pink-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">Instagram</span>
              <span className="text-[10px] text-slate-400 font-mono">@egyfox_technology</span>
            </div>
          </a>

          {/* 9. Twitter / X */}
          <a
            href={CHANNEL_INFO.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 hover:text-orange-500 dark:hover:bg-slate-800 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Globe className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">تويتر (X)</span>
              <span className="text-[10px] text-slate-400 font-mono">@egyfoxtechno</span>
            </div>
          </a>

          {/* 10. Egyfox Systems */}
          <a
            href={CHANNEL_INFO.egyfoxProgramsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/30 dark:hover:text-orange-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Cpu className="w-4 h-4 text-orange-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">برامج ايجي فوكس</span>
              <span className="text-[10px] text-slate-400">egyfox.systems</span>
            </div>
          </a>

          {/* 11. Reddit */}
          <a
            href={CHANNEL_INFO.redditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/30 dark:hover:text-orange-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Share2 className="w-4 h-4 text-orange-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">Reddit</span>
              <span className="text-[10px] text-slate-400 font-mono">u/Egyfoxtech</span>
            </div>
          </a>

          {/* 12. Pinterest */}
          <a
            href={CHANNEL_INFO.pinterestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
          >
            <Globe className="w-4 h-4 text-red-500 shrink-0" />
            <div className="truncate">
              <span className="block text-xs font-bold truncate">Pinterest</span>
              <span className="text-[10px] text-slate-400 font-mono">egyfoxtech</span>
            </div>
          </a>
        </div>
      </section>

      {/* App Settings (Language, Theme, Reset) */}
      <section className="p-6 rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          {t.appSettings}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Language Switch */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {t.languageToggle}
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClickTick();
                onToggleLanguage();
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-orange-500 border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              {lang === 'ar' ? 'العربية (RTL)' : 'English (LTR)'}
            </button>
          </div>

          {/* Theme Switch */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-orange-500" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {t.themeToggle}
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClickTick();
                onToggleTheme();
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-orange-500 border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              {theme === 'dark' ? t.themeDark : t.themeLight}
            </button>
          </div>

          {/* Reset sample data */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                إعادة الضبط
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClickTick();
                onResetData();
                onShowToast(t.resetDataConfirm);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 border border-slate-200 dark:border-slate-700"
            >
              استعادة الافتراضي
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
