import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { translations } from '../../utils/i18n';
import { sound } from '../../utils/sound';
import {
  ArrowRightLeft,
  Calculator,
  RefreshCw,
  TrendingUp,
  Clock,
  Sparkles,
  Coins,
  Globe2,
} from 'lucide-react';

interface CurrencyConverterTabProps {
  lang: Language;
  onNavigateCards?: () => void;
  onShowToast?: (msg: string) => void;
}

interface RatesMap {
  [key: string]: number;
}

interface CurrencyInfo {
  code: string;
  nameAr: string;
  nameEn: string;
  symbol: string;
  flag: string;
}

export const CurrencyConverterTab: React.FC<CurrencyConverterTabProps> = ({
  lang,
  onShowToast,
}) => {
  const t = translations[lang];

  // Comprehensive currency list requested by user
  const CURRENCIES: CurrencyInfo[] = [
    { code: 'USD', nameAr: 'دولار أمريكي', nameEn: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', nameAr: 'يورو أوروبي', nameEn: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'SAR', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
    { code: 'AED', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'KWD', nameAr: 'دينار كويتي', nameEn: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
    { code: 'QAR', nameAr: 'ريال قطري', nameEn: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦' },
    { code: 'BHD', nameAr: 'دينار بحريني', nameEn: 'Bahraini Dinar', symbol: 'د.ب', flag: '🇧🇭' },
    { code: 'OMR', nameAr: 'ريال عماني', nameEn: 'Omani Rial', symbol: 'ر.ع', flag: '🇴🇲' },
    { code: 'GBP', nameAr: 'جنيه إسترليني', nameEn: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'USDT', nameAr: 'تيثر رقمي (USDT)', nameEn: 'Tether USDT', symbol: '₮', flag: '🟢' },
    { code: 'EGP', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound', symbol: 'ج.م', flag: '🇪🇬' },
  ];

  // Default fallback rates
  const DEFAULT_RATES: RatesMap = {
    USD: 1,
    EGP: 49.35,
    EUR: 0.92,
    SAR: 3.75,
    AED: 3.67,
    KWD: 0.308,
    QAR: 3.64,
    BHD: 0.376,
    OMR: 0.385,
    GBP: 0.79,
    USDT: 1.00,
  };

  const [rates, setRates] = useState<RatesMap>(DEFAULT_RATES);
  const [lastUpdated, setLastUpdated] = useState<string>('لحظي');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);

  // Converter state
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EGP');
  const [amount, setAmount] = useState<number>(100);

  // Fetch live currency rates periodically
  const fetchLiveRates = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates) {
          setRates((prev) => ({
            ...prev,
            USD: 1,
            EGP: data.rates.EGP || 49.35,
            EUR: data.rates.EUR || 0.92,
            SAR: data.rates.SAR || 3.75,
            AED: data.rates.AED || 3.67,
            KWD: data.rates.KWD || 0.308,
            QAR: data.rates.QAR || 3.64,
            BHD: data.rates.BHD || 0.376,
            OMR: data.rates.OMR || 0.385,
            GBP: data.rates.GBP || 0.79,
            USDT: 1.00,
          }));
          const date = new Date();
          setLastUpdated(date.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          setCountdown(60);
          if (!silent && onShowToast) {
            onShowToast(lang === 'ar' ? 'تم تحديث أسعار الصرف بنجاح' : 'Exchange rates updated successfully');
          }
        }
      }
    } catch (e) {
      console.warn('Using offline rates backup', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and auto-refresh periodic timer (every 60 seconds)
  useEffect(() => {
    fetchLiveRates(true);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchLiveRates(true);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSwap = () => {
    sound.playClickTick();
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Convert amount
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  const convertedAmount = (amount / fromRate) * toRate;
  const egpPerUnit = (rates['EGP'] || 49.35) / fromRate;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-500">
            <Calculator className="w-4 h-4" />
            <span>Live Currency Rates & Real-Time Converter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {lang === 'ar' ? 'حاسبة ومحول أسعار العملات' : 'Live Currency Exchange Rates'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'تحديث لحظي ودوري لأسعار العملات العالمية والعربية (اليورو، الدرهم، الريال، الدولار، الدينار، الجنيه) بأحدث التحديثات.'
              : 'Periodically updated exchange rates for Euro, Dirham, Riyal, Dollar, Dinar, and Egyptian Pound.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Periodic auto-refresh countdown indicator */}
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>تحديث دوري: <strong className="font-mono text-slate-900 dark:text-white tabular-nums">{countdown}s</strong></span>
          </div>

          <button
            onClick={() => {
              sound.playClickTick();
              fetchLiveRates(false);
            }}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white inline-flex items-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>تحديث الآن</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Currency Converter Card */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? 'محول العملات الفوري' : 'Live Currency Exchange'}
              </h2>
            </div>
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
              آخر تحديث: {lastUpdated}
            </span>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {lang === 'ar' ? 'المبلغ المراد تحويله' : 'Amount to Convert'}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full h-12 px-4 text-base font-bold font-mono rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-orange-500 dark:focus:border-orange-500 text-slate-900 dark:text-slate-100 focus:outline-none tabular-nums"
              />
              <span className="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                {fromCurrency}
              </span>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
              {[25, 50, 100, 250, 500, 1000, 5000].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    sound.playClickTick();
                    setAmount(val);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg transition-colors shrink-0 ${
                    amount === val
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {val.toLocaleString()} {fromCurrency}
                </button>
              ))}
            </div>
          </div>

          {/* Currency Selectors & Swap */}
          <div className="grid grid-cols-1 sm:grid-cols-9 items-center gap-3">
            {/* From */}
            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {lang === 'ar' ? 'من عملة' : 'From'}
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full h-11 px-3 text-xs sm:text-sm font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-orange-500 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {lang === 'ar' ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="sm:col-span-1 flex justify-center pt-5 sm:pt-4">
              <button
                onClick={handleSwap}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all active:scale-90 shadow-xs"
                title="تبديل العملات"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To */}
            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {lang === 'ar' ? 'إلى عملة' : 'To'}
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full h-11 px-3 text-xs sm:text-sm font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-orange-500 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {lang === 'ar' ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 text-center space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
              النتيجة المحسوبة بسعر الصرف المباشر:
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {convertedAmount.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              <span className="text-orange-500 text-xl font-bold">{toCurrency}</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block pt-1.5 font-mono">
              1 {fromCurrency} = {(toRate / fromRate).toFixed(4)} {toCurrency}
            </span>
          </div>
        </div>

        {/* Live Rates Overview Grid (Euro, Dirham, Riyal, Dinar, USD, etc.) */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-orange-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  أسعار العملات مقابل الجنيه المصري
                </h3>
                <span className="text-[11px] text-slate-400">
                  تحديث دوري لحظي من البنوك والأسواق العالمية
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pe-1">
            {CURRENCIES.filter((c) => c.code !== 'EGP').map((c) => {
              const rateToUSD = rates[c.code] || 1;
              const egpPrice = (rates['EGP'] || 49.35) / rateToUSD;

              return (
                <div
                  key={c.code}
                  onClick={() => {
                    sound.playClickTick();
                    setFromCurrency(c.code);
                    setToCurrency('EGP');
                  }}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 hover:border-orange-500/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl shrink-0">{c.flag}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {c.code}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          ({lang === 'ar' ? c.nameAr : c.nameEn})
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        1 {c.code} = {(1 / rateToUSD).toFixed(3)} USD
                      </span>
                    </div>
                  </div>

                  <div className="text-end">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white font-mono tabular-nums block group-hover:text-orange-500 transition-colors">
                      {egpPrice.toFixed(2)} ج.م
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-500">
                      سعر الصرف المباشر
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
