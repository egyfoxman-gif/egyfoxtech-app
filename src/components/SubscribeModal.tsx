import React, { useState } from 'react';
import { Youtube, CheckCircle2, Bell, Sparkles, ExternalLink, X } from 'lucide-react';
import { CHANNEL_INFO } from '../data/initialData';
import { sound } from '../utils/sound';

import { Language } from '../types';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed?: () => void;
  isSubscribed?: boolean;
  lang?: Language;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSubscribed,
  isSubscribed = false,
  lang = 'ar',
}) => {
  const [confirmed, setConfirmed] = useState(isSubscribed);

  if (!isOpen) return null;

  const handleConfirm = () => {
    sound.playNotificationChime();
    setConfirmed(true);
    if (onSubscribed) onSubscribed();
    // Also launch the YouTube direct subscribe link
    window.open(CHANNEL_INFO.youtubeSubscribeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Channel Icon & Badge */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-slate-900 border-2 border-orange-500/40 p-2 flex items-center justify-center shadow-lg">
          <img
            src="/logos/egyfox_transparent_logo.png"
            alt="EgyFox Technology"
            className="w-full h-auto object-contain"
          />
          <div className="absolute -bottom-1 -end-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
            <Youtube className="w-3.5 h-3.5 fill-white" />
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            الاشتراك في قناة EgyFox Technology 🔔
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            اشترك في قناة المهندس أحمد خضر الرسمية ليصلك جديد كروت الشراء الدولي، شروحات انستاباي، والبنوك الإلكترونية فور نشرها.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>تفعيل زر الجرس وتنبيهات الحلقات الجديدة تلقائياً</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>أكواد خصم حصرية للمشتركين على بطاقات ريزون وبايبت</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleConfirm}
            className="w-full py-3 px-6 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Youtube className="w-5 h-5 fill-white" />
            <span>{confirmed ? 'مشترك بالقناة ✓ (فتح يوتيوب للتحقق)' : 'اشتراك الآن في القناة وتفعيل الجرس'}</span>
          </button>

          <p className="text-[11px] text-slate-400">
            سيتم فتح رابط الاشتراك التلقائي المؤكد مع نافذة التأكيد الرسمية.
          </p>
        </div>
      </div>
    </div>
  );
};
