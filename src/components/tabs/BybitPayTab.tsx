import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';
import { sound } from '../../utils/sound';
import {
  CreditCard,
  QrCode,
  Wallet,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Play,
  BookOpen,
  ArrowRight,
  Sparkles,
  DollarSign,
  Send,
  RefreshCw,
  Gift,
} from 'lucide-react';

interface BybitPayTabProps {
  lang: Language;
  onPlayVideoById: (videoId: string) => void;
  onShowToast: (msg: string) => void;
}

export const BybitPayTab: React.FC<BybitPayTabProps> = ({
  lang,
  onPlayVideoById,
  onShowToast,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Interactive Payment Generator State
  const [payAmount, setPayAmount] = useState<string>('25.00');
  const [payCurrency, setPayCurrency] = useState<'USDT' | 'USDC' | 'BTC' | 'ETH'>('USDT');
  const [orderNote, setOrderNote] = useState<string>('اشتراك شهري / EgyFox Subscription');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const referralCode = 'FOX';
  const referralUrl = 'https://www.bybit.com/register?affiliate_id=644385';
  const tutorialVideoId = '7L8Wy0zzA1A'; // Real Bybit tutorial video from channel

  const handleCopyCode = () => {
    sound.playClickTick();
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopiedCode(true);
      onShowToast(lang === 'ar' ? 'تم نسخ كود بايبت (FOX) بنجاح!' : 'Bybit code copied!');
      setTimeout(() => setCopiedCode(false), 2500);
    });
  };

  const handleConnectWallet = () => {
    sound.playClickTick();
    if (!isConnected) {
      setIsConnected(true);
      setWalletAddress('0x8fB...94a2');
      onShowToast(lang === 'ar' ? 'تم ربط محفظة Bybit Web3 بنجاح!' : 'Bybit Web3 Wallet connected!');
    } else {
      setIsConnected(false);
      setWalletAddress(null);
      onShowToast(lang === 'ar' ? 'تم إلغاء ربط المحفظة' : 'Wallet disconnected');
    }
  };

  const handleSimulatePayment = () => {
    sound.playClickTick();
    setIsProcessingPayment(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      sound.playNotificationChime();
      onShowToast(lang === 'ar' ? `تم إتمام الدفع بنجاح بقيمة ${payAmount} ${payCurrency} عبر Bybit Pay!` : `Paid ${payAmount} ${payCurrency} successfully!`);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Hero Section with Official Card Visual */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#111927] to-slate-900 text-white border border-slate-800 p-6 sm:p-10 shadow-xl">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -end-24 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -start-24 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text and Value Prop */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>خدمة الدفع الرسمية Bybit Pay & Bybit Mastercard</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              ادفع واشترِ بالعملات الرقمية مباشرة وبدون عمولات الغاز
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              بوابة <strong className="text-amber-400 font-bold">Bybit Pay</strong> تتيح لك الشراء عبر الإنترنت ومن نقاط البيع المباشرة في جميع أنحاء العالم باستخدام رصيدك من <span className="font-semibold text-white">USDT و USDC و BTC</span> مع بطاقة ماستركارد الرسمية وبدون الحاجة لرسوم شبكة البلوكشين المعقدة.
            </p>

            {/* Quick Specs Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0% رسوم تحويل P2P</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>مقبولة لدى 90M+ متجر</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>كاش باك حتى 10%</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={referralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
              >
                <Gift className="w-4 h-4" />
                <span>فتح حساب وتفعيل Bybit Pay (مكافأة حتى $30,000)</span>
                <ExternalLink className="w-3.5 h-3.5 ms-1" />
              </a>

              <button
                onClick={handleCopyCode}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs inline-flex items-center gap-2 active:scale-95 transition-all"
                title="نسخ كود الإحالة"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>كود الخصم: <strong className="font-mono text-amber-400 font-bold">{referralCode}</strong></span>
              </button>

              <button
                onClick={() => onPlayVideoById(tutorialVideoId)}
                className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs inline-flex items-center gap-2 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>شاهد شرح تفعيل البطاقة في مصر</span>
              </button>
            </div>
          </div>

          {/* Card Visual Container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-30 group-hover:opacity-50 blur-lg transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950">
                <img
                  src="/cards/bybit_card.png"
                  alt="Bybit Pay Card"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-300"
                />
              </div>

              {/* Supported Cryptos bar */}
              <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-around text-xs text-slate-300">
                <span className="font-bold text-emerald-400">USDT</span>
                <span>•</span>
                <span className="font-bold text-blue-400">USDC</span>
                <span>•</span>
                <span className="font-bold text-amber-400">BTC</span>
                <span>•</span>
                <span className="font-bold text-purple-400">ETH</span>
                <span>•</span>
                <span className="font-bold text-sky-400">MNT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Service Highlights and Interactive Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Descriptive Overview & Core Advantages */}
        <div className="lg:col-span-7 space-y-6">
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  ما هي خدمة Bybit Pay وكيف تعمل؟
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  دليلك الشامل لدمج واستخدام حلول الدفع المالي الرقمي
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                تُعد <strong className="text-slate-900 dark:text-white">Bybit Pay</strong> منظومة متكاملة طوّرتها منصة Bybit العالمية لتمكين الأفراد والتجار والمطورين من استقبال وإرسال المدفوعات بالعملات المشفرة الفورية دون الحاجة لتحمل رسوم الشبكة (Gasless P2P Transactions) ودون انتظار تأكيدات البلوكشين الطويلة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>تحويلات فورية برقم الـ UID</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    حوّل لأي مستخدم بايبت حول العالم فورياً بمجرد إدخال رقم الـ UID أو البريد أو مسح كود QR وبدون أي سنت رسوم.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                    <CreditCard className="w-4 h-4 text-orange-500" />
                    <span>بطاقة ماستركارد افتراضية وملموسة</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    تحويل تلقائي من رصيد الكريبتو إلى العملات الورقية لحظة الشراء من أي ماكينة POS أو متجر إلكتروني.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                    <QrCode className="w-4 h-4 text-emerald-500" />
                    <span>بوابة دفع للتجار (Merchant API)</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    دمج أزرار الدفع بباي بت باي في المواقع والمتاجر لتلقي مدفوعات العملاء بعملة USDT مع تسوية فورية.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                    <Wallet className="w-4 h-4 text-sky-500" />
                    <span>ربط محفظة Bybit Web3</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    اتصال آمن وسهل ببروتوكولات التمويل اللامركزي مع الحفاظ على مفاتيحك وحماية حسابك.
                  </p>
                </div>
              </div>
            </div>

            {/* Official Articles on egyfoxtech.com */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                مقال تفصيلي من موقع ايجي فوكس تكنولوجي:
              </span>
              <a
                href="https://www.egyfoxtech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-bold"
              >
                <BookOpen className="w-4 h-4" />
                <span>قراءة مراجعة وتجربة كارت Bybit في مصر 2026</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </a>
            </div>
          </section>
        </div>

        {/* Right: Interactive Payment Generator & Wallet Connect Hub */}
        <div className="lg:col-span-5 space-y-6">
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  بوابة وتجربة الدفع Bybit Pay
                </h3>
              </div>

              {/* Wallet Connection Toggle Button */}
              <button
                onClick={handleConnectWallet}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                  isConnected
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>{isConnected ? walletAddress : 'ربط المحفظة'}</span>
              </button>
            </div>

            {/* Interactive Payment Simulator Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  المبلغ المراد سداده أو طلبه:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="flex-1 h-11 px-3 text-sm font-bold font-mono rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                  <select
                    value={payCurrency}
                    onChange={(e) => setPayCurrency(e.target.value as any)}
                    className="h-11 px-3 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="USDT">USDT</option>
                    <option value="USDC">USDC</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  وصف المعاملة أو الطلب:
                </label>
                <input
                  type="text"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="وصف المعاملة..."
                  className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              {/* Generated QR Mock Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 flex flex-col items-center justify-center text-center space-y-2">
                <div className="w-36 h-36 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                  {/* Generated QR SVG */}
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="25" height="25" fill="#111827" />
                    <rect x="15" y="15" width="15" height="15" fill="white" />
                    <rect x="18" y="18" width="9" height="9" fill="#F59E0B" />
                    <rect x="65" y="10" width="25" height="25" fill="#111827" />
                    <rect x="70" y="15" width="15" height="15" fill="white" />
                    <rect x="73" y="18" width="9" height="9" fill="#F59E0B" />
                    <rect x="10" y="65" width="25" height="25" fill="#111827" />
                    <rect x="15" y="70" width="15" height="15" fill="white" />
                    <rect x="18" y="73" width="9" height="9" fill="#F59E0B" />
                    {/* Pattern dots */}
                    <rect x="42" y="15" width="6" height="6" fill="#111827" />
                    <rect x="52" y="25" width="6" height="6" fill="#111827" />
                    <rect x="45" y="45" width="10" height="10" fill="#F59E0B" />
                    <rect x="65" y="55" width="8" height="8" fill="#111827" />
                    <rect x="78" y="70" width="12" height="12" fill="#111827" />
                    <rect x="42" y="75" width="6" height="6" fill="#111827" />
                  </svg>
                </div>

                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block font-mono">
                    {payAmount} {payCurrency}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    امسح الكود عبر تطبيق Bybit أو اضغط على زر السداد أدناه
                  </span>
                </div>
              </div>

              {/* Action Simulation Button */}
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessingPayment}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold text-xs inline-flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {isProcessingPayment ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جارٍ معالجة الدفع عبر Bybit Pay...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>تجربة الدفع الفوري الآن (0% عمولة)</span>
                  </>
                )}
              </button>

              {paymentSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>تم تأكيد العملية بنجاح! رقم إيصال Bybit Pay: #BP-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
              )}

              {/* Official Gateway & Developer Link */}
              <div className="pt-2 text-center">
                <a
                  href="https://www.bybit.com/en/fiat-crypto/pay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-amber-500 inline-flex items-center gap-1"
                >
                  <span>رابط بوابة وتوثيق Bybit Pay للمطورين والتجار</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
