import React, { useState } from 'react';
import { VirtualCard, Language, Video } from '../../types';
import { translations } from '../../utils/i18n';
import { VIRTUAL_CARDS } from '../../data/initialData';
import { sound } from '../../utils/sound';
import {
  CreditCard,
  ExternalLink,
  Copy,
  Check,
  Play,
  BookOpen,
  Sparkles,
  Zap,
  Shield,
  Percent,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';

interface CardsTabProps {
  lang: Language;
  onPlayVideoById: (videoId: string) => void;
  onShowToast: (msg: string) => void;
  onNavigateBybitPay?: () => void;
}

export const CardsTab: React.FC<CardsTabProps> = ({
  lang,
  onPlayVideoById,
  onShowToast,
  onNavigateBybitPay,
}) => {
  const [filter, setFilter] = useState<'all' | 'visa' | 'mastercard' | 'bybit'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const t = translations[lang];

  const filteredCards = VIRTUAL_CARDS.filter((card) => {
    if (filter === 'all') return true;
    if (filter === 'bybit') return card.isBybitPay || card.id.includes('bybit');
    return card.provider === filter;
  });

  const handleCopyCode = (code: string) => {
    sound.playClickTick();
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      onShowToast(`تم نسخ كود الخصم: ${code}`);
      setTimeout(() => setCopiedCode(null), 3000);
    }).catch(() => {
      onShowToast(code);
    });
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-500">
          <CreditCard className="w-4 h-4" />
          <span>International Virtual & Debit Cards Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          {lang === 'ar' ? 'البطاقات الافتراضية وكروت الشراء الدولي' : 'Virtual Cards & Global Payment Hub'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          {lang === 'ar'
            ? 'جميع البطاقات الافتراضية والدولية المشروحة على قناة EgyFox Technology للشراء أونلاين، تمويل الإعلانات، وتخطي قيود الدفع بالدولار بروابط الإحالة الرسمية وأكواد الخصم الحصرية.'
            : 'All virtual cards reviewed on EgyFox Technology for online purchases, ad payments, and foreign currency solutions with verified referral links and exclusive promo codes.'}
        </p>
      </div>

      {/* Featured Bybit Pay Spotlight Service */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#101726] to-[#1c1830] text-white p-6 sm:p-8 border border-slate-700/80 shadow-xl">
        <div className="absolute -top-24 -end-24 w-72 h-72 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>جديد في القناة: خدمة Bybit Pay المباشرة</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              خدمة Bybit Pay وكارت Bybit ماستركارد الدولي
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ادفع في آلاف المواقع والتطبيقات مباشرة بـ USDT أو Crypto بدون وسيط وبدون رسوم تحويل إضافية. متوافقة مع متجر جوجل بلاي المصري، وتمنحك كاش باك فوري يصل حتى 10% مع شحن سهل عبر P2P بالجنيه المصري (فودافون كاش وانستاباي).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs text-slate-300 bg-white/10 px-3 py-1 rounded-xl">
                كود الدعوة: <strong className="text-amber-400 font-mono">GVPRO3R</strong>
              </span>
              <button
                onClick={() => handleCopyCode('GVPRO3R')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ الكود</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://www.bybit.com/invite?ref=GVPRO3R"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-all active:scale-95 whitespace-nowrap"
            >
              <span>التسجيل في Bybit و Bybit Pay</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => onPlayVideoById('yHPASho0PHk')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>مشاهدة فيديو الشرح والمقارنة</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => {
            sound.playClickTick();
            setFilter('all');
          }}
          className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-all ${
            filter === 'all'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'bg-white dark:bg-[#0f1523] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80'
          }`}
        >
          {lang === 'ar' ? 'جميع البطاقات المشروحة' : 'All Cards'}
        </button>
        <button
          onClick={() => {
            sound.playClickTick();
            setFilter('bybit');
          }}
          className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-all ${
            filter === 'bybit'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'bg-white dark:bg-[#0f1523] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80'
          }`}
        >
          Bybit Pay & Cards
        </button>
        <button
          onClick={() => {
            sound.playClickTick();
            setFilter('visa');
          }}
          className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-all ${
            filter === 'visa'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'bg-white dark:bg-[#0f1523] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80'
          }`}
        >
          Visa (فيزا)
        </button>
        <button
          onClick={() => {
            sound.playClickTick();
            setFilter('mastercard');
          }}
          className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-all ${
            filter === 'mastercard'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'bg-white dark:bg-[#0f1523] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80'
          }`}
        >
          Mastercard (ماستركارد)
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <article
            key={card.id}
            className="group flex flex-col rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 hover:border-orange-500/50 dark:hover:border-orange-500/50 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden"
          >
            {/* Visual Card Image Display */}
            <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-slate-900 to-slate-950 p-6 flex items-center justify-center overflow-hidden">
              <img
                src={card.image}
                alt={card.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-300 rounded-xl"
              />

              {card.badge && (
                <div className="absolute top-3 end-3 px-2.5 py-1 rounded-lg bg-orange-500/90 text-white text-[10px] font-bold shadow-md">
                  {card.badge}
                </div>
              )}
            </div>

            {/* Card Content & Features */}
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {lang === 'ar' ? card.nameAr : card.name}
                  </h3>
                  <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {card.provider}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {card.description}
                </p>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block">رسوم الإصدار:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {card.issuanceFee}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">الرسوم الشهرية:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {card.monthlyFee}
                    </span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-200/40 dark:border-slate-800/40">
                    <span className="text-slate-400 block">طرق الشحن:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {card.depositMethods}
                    </span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="mt-4 space-y-1.5">
                  {card.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Promo Code with Copy */}
                {card.promoCode && (
                  <div className="mt-4 p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-orange-600 dark:text-orange-400 block font-bold">
                        كود خصم / دعوة القناة:
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                        {card.promoCode}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(card.promoCode!)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white inline-flex items-center gap-1 transition-colors"
                    >
                      {copiedCode === card.promoCode ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الكود</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                {/* Referral Link Button */}
                <a
                  href={card.referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                >
                  <span>التسجيل برابط القناة والحصول على العرض</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Video & Article Sub-actions */}
                <div className="flex items-center gap-2">
                  {card.videoId && (
                    <button
                      onClick={() => {
                        sound.playClickTick();
                        onPlayVideoById(card.videoId!);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-orange-500 fill-current" />
                      <span>شرح الفيديو</span>
                    </button>
                  )}

                  {card.articleUrl && (
                    <a
                      href={card.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span>قراءة المقالة</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
