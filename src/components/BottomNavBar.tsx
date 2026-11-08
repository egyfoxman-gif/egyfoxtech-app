import React from 'react';
import { TabType, Language } from '../types';
import { translations } from '../utils/i18n';
import { PlaySquare, CreditCard, Calculator, Layers, Bell, Info, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  lang: Language;
  unreadCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  lang,
  unreadCount,
}) => {
  const t = translations[lang];

  const tabs: Array<{
    id: TabType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    hasBadge?: boolean;
    isHighlight?: boolean;
  }> = [
    {
      id: 'videos',
      label: t.tabVideos,
      icon: PlaySquare,
    },
    {
      id: 'bybitpay',
      label: lang === 'ar' ? 'Bybit Pay' : 'Bybit Pay',
      icon: Zap,
      isHighlight: true,
    },
    {
      id: 'cards',
      label: lang === 'ar' ? 'البطاقات' : 'Cards',
      icon: CreditCard,
    },
    {
      id: 'converter',
      label: lang === 'ar' ? 'العملات' : 'Rates',
      icon: Calculator,
    },
    {
      id: 'playlists',
      label: t.tabPlaylists,
      icon: Layers,
    },
    {
      id: 'channel',
      label: t.tabChannel,
      icon: Info,
      hasBadge: unreadCount > 0,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#080c14]/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800/90 shadow-lg pb-safe transition-colors"
    >
      <div className="max-w-xl mx-auto h-16 grid grid-cols-6 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClickTick();
                onTabChange(tab.id);
              }}
              className={`relative min-h-[44px] min-w-[44px] flex flex-col items-center justify-center py-1 transition-all ${
                isActive
                  ? 'text-orange-500 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'scale-100 stroke-[1.8]'
                  }`}
                />
                {tab.hasBadge && (
                  <span className="absolute -top-1 -end-1.5 flex h-3.5 min-w-[14px] px-1 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] sm:text-[10px] tracking-tight mt-1 whitespace-nowrap truncate max-w-[56px] sm:max-w-[68px] ${
                  isActive ? 'text-orange-500 font-bold' : ''
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-orange-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
