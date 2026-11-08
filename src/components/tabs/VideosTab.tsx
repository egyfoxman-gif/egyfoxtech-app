import React, { useState, useMemo } from 'react';
import { Video, CategoryType, Language } from '../../types';
import { translations } from '../../utils/i18n';
import { VideoCard } from '../VideoCard';
import { Search, SlidersHorizontal, PlaySquare, RefreshCw, X } from 'lucide-react';
import { sound } from '../../utils/sound';
import { LiveUserSlider } from '../LiveUserSlider';

interface VideosTabProps {
  videos: Video[];
  lang: Language;
  onPlayVideo: (video: Video) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onShare: (video: Video) => void;
  initialSearch?: string;
  initialCategory?: CategoryType;
}

export const VideosTab: React.FC<VideosTabProps> = ({
  videos,
  lang,
  onPlayVideo,
  favorites,
  onToggleFavorite,
  onShare,
  initialSearch = '',
  initialCategory = 'all',
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [visibleCount, setVisibleCount] = useState<number>(36);

  const t = translations[lang];

  const categories: Array<{ id: CategoryType; label: string }> = [
    { id: 'all', label: t.catAll },
    { id: 'cards', label: t.catCards },
    { id: 'ebanks', label: t.catEbanks },
    { id: 'instapay', label: t.catInstapay },
    { id: 'investing', label: t.catInvesting },
    { id: 'freelance', label: t.catFreelance },
    { id: 'tutorials', label: t.catTutorials },
  ];

  // Filtering & Sorting
  const filteredVideos = useMemo(() => {
    return videos
      .filter((v) => {
        // Category filter
        if (selectedCategory !== 'all' && v.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = (v.title && v.title.toLowerCase().includes(q)) || (v.titleEn && v.titleEn.toLowerCase().includes(q));
          const matchDesc = (v.description && v.description.toLowerCase().includes(q)) || (v.descriptionEn && v.descriptionEn.toLowerCase().includes(q));
          const matchTag = v.tags && v.tags.some((tag) => tag.toLowerCase().includes(q));
          return matchTitle || matchDesc || matchTag;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') {
          const viewsA = parseFloat(a.views.replace(/[^0-9.]/g, '')) * (a.views.includes('M') ? 1000 : 1);
          const viewsB = parseFloat(b.views.replace(/[^0-9.]/g, '')) * (b.views.includes('M') ? 1000 : 1);
          return viewsB - viewsA;
        }
        // Default latest: keep order
        return 0;
      });
  }, [videos, selectedCategory, search, sortBy]);

  const handleReset = () => {
    sound.playClickTick();
    setSearch('');
    setSelectedCategory('all');
    setSortBy('latest');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Live User Presence Slider */}
      <LiveUserSlider lang={lang} />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-500">
            <PlaySquare className="w-4 h-4" />
            <span>Egyfox Channel Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {t.videosHeader}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.videosSubtitle}
          </p>
        </div>

        {/* Counter and Sort */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            <strong className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
              {filteredVideos.length}
            </strong>{' '}
            {t.resultsCount}
          </span>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-xs">
            <button
              onClick={() => {
                sound.playClickTick();
                setSortBy('latest');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                sortBy === 'latest'
                  ? 'bg-white dark:bg-slate-800 text-orange-500 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.sortLatest}
            </button>
            <button
              onClick={() => {
                sound.playClickTick();
                setSortBy('popular');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                sortBy === 'popular'
                  ? 'bg-white dark:bg-slate-800 text-orange-500 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t.sortPopular}
            </button>
          </div>
        </div>
      </div>

      {/* Search Input Bar (Mobile & Quick Access) */}
      <div className="relative">
        <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3.5 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full h-11 ps-10 pe-10 text-sm rounded-2xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80 focus:border-orange-500 dark:focus:border-orange-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all shadow-xs"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute top-1/2 -translate-y-1/2 end-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            title="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Interactive Category Filter Pills (Button controls as per frontend-design constitution) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClickTick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                  : 'bg-white dark:bg-[#0f1523] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredVideos.slice(0, visibleCount).map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                lang={lang}
                onPlay={onPlayVideo}
                isFavorite={favorites.includes(video.id)}
                onToggleFavorite={onToggleFavorite}
                onShare={onShare}
              />
            ))}
          </div>

          {/* Load More Button if remaining */}
          {visibleCount < filteredVideos.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  sound.playClickTick();
                  setVisibleCount((prev) => prev + 36);
                }}
                className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-orange-500 font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <span>عرض المزيد من فيديوهات القناة (تم عرض {Math.min(visibleCount, filteredVideos.length)} من {filteredVideos.length})</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 px-4 text-center rounded-3xl bg-white dark:bg-[#0f1523] border border-slate-200/80 dark:border-slate-800/80">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 mx-auto flex items-center justify-center mb-3">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t.noVideosFound}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
            جرب البحث بكلمات أخرى مثل "تجميعة" أو "بايثون" أو "ويندوز" أو قم بإعادة ضبط الفلاتر.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white inline-flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.resetFilters}</span>
          </button>
        </div>
      )}
    </div>
  );
};
