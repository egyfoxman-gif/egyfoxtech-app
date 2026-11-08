import React, { useState, useEffect } from 'react';
import { Users, Flame, Activity, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface LiveUserSliderProps {
  lang: Language;
  className?: string;
}

export const LiveUserSlider: React.FC<LiveUserSliderProps> = ({
  lang,
  className = '',
}) => {
  // Realistic concurrent app audience calculation
  const calculateBaseUsers = () => {
    const now = new Date();
    const hour = now.getHours(); // 0 to 23

    // Organic concurrent viewer curve (220 to 480 users)
    let base = 260;
    if (hour >= 18 && hour <= 23) {
      base = 380 + ((hour - 18) * 18); // Evening peak
    } else if (hour >= 12 && hour < 18) {
      base = 310 + ((hour - 12) * 12);
    } else if (hour >= 0 && hour < 6) {
      base = 190 - (hour * 8);
    } else {
      base = 220 + ((hour - 6) * 10);
    }

    return base;
  };

  const [activeUsers, setActiveUsers] = useState<number>(calculateBaseUsers);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  // Subtle organic fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(140, Math.min(520, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Slide between informative presence stats every 5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const slides = [
    {
      id: 'active_users',
      icon: <Users className="w-3.5 h-3.5 text-emerald-500" />,
      contentAr: (
        <>
          <span className="font-bold text-emerald-500 tabular-nums">
            {activeUsers.toLocaleString('ar-EG')}
          </span>{' '}
          مستخدم يتصفحون التطبيق والشروحات الآن
        </>
      ),
      contentEn: (
        <>
          <span className="font-bold text-emerald-500 tabular-nums">
            {activeUsers.toLocaleString('en-US')}
          </span>{' '}
          active users browsing guides now
        </>
      ),
    },
    {
      id: 'subscribers',
      icon: <Flame className="w-3.5 h-3.5 text-orange-500" />,
      contentAr: (
        <>
          مجتمع <span className="font-bold text-orange-500">EgyFox Technology</span> يضم أكثر من{' '}
          <span className="font-bold tabular-nums">35,000+</span> مهتم بالتقنية والمالية
        </>
      ),
      contentEn: (
        <>
          <span className="font-bold text-orange-500">EgyFox Technology</span> community with over{' '}
          <span className="font-bold tabular-nums">35,000+</span> tech & finance followers
        </>
      ),
    },
    {
      id: 'live_rates',
      icon: <Activity className="w-3.5 h-3.5 text-sky-500" />,
      contentAr: (
        <>
          تحديث دوري لأسعار الصرف الرسمية والبطاقات الافتراضية وباي بت باي
        </>
      ),
      contentEn: (
        <>
          Live periodic updates for exchange rates, virtual cards & Bybit Pay
        </>
      ),
    },
    {
      id: 'instant_alerts',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />,
      contentAr: (
        <>
          تنبيهات فورية عند رفع أي حلقة جديدة بالقناة
        </>
      ),
      contentEn: (
        <>
          Instant in-app alerts upon every new YouTube channel upload
        </>
      ),
    },
  ];

  const currentSlide = slides[slideIndex];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 px-3.5 py-2 shadow-xs transition-all ${className}`}
    >
      <div className="flex items-center justify-between gap-3 text-xs text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2 min-w-0">
          {/* Live pulsing indicator */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>

          <span className="shrink-0">{currentSlide.icon}</span>

          <span className="truncate text-xs font-medium">
            {lang === 'ar' ? currentSlide.contentAr : currentSlide.contentEn}
          </span>
        </div>

        {/* Dots slider indicators */}
        <div className="flex items-center gap-1 shrink-0">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === slideIndex
                  ? 'w-4 bg-orange-500'
                  : 'w-1.5 bg-slate-300 dark:bg-slate-700'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
