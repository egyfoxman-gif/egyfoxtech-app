import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-11',
    lg: 'h-12 sm:h-16',
    xl: 'h-16 sm:h-20',
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Fully Transparent Brand Logo */}
      <div className="relative inline-flex items-center justify-center bg-transparent transition-all">
        {!imgError ? (
          <img
            src="/logos/egyfox_transparent_logo.png"
            alt="EgyFox Technology"
            referrerPolicy="no-referrer"
            onError={() => {
              // fallback to direct asset
              const target = event?.target as HTMLImageElement;
              if (target && target.src.indexOf('image_49bfb5e4.png') === -1) {
                target.src = '/assets/aistudio/image_49bfb5e4.png';
              } else {
                setImgError(true);
              }
            }}
            className={`${heights[size]} w-auto object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-105`}
          />
        ) : (
          <div className="flex items-center gap-2 px-1">
            <span className="font-extrabold tracking-tight text-[#FFA05C] text-lg sm:text-xl drop-shadow-sm">
              EGYFOX
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-800 dark:text-white font-bold">
              TECHNOLOGY
            </span>
          </div>
        )}
      </div>

      {showSubtitle && (
        <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          أحمد خضر
        </span>
      )}
    </div>
  );
};
