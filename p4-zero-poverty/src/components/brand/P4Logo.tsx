import React from 'react';

interface P4LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'icon-only';
  theme?: 'dark' | 'light';
  showSubtitle?: boolean;
  className?: string;
}

export const P4Logo: React.FC<P4LogoProps> = ({
  size = 'md',
  variant = 'full',
  theme = 'light',
  showSubtitle = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 34, title: 'text-base font-bold', sub: 'text-[9px]' },
    md: { icon: 44, title: 'text-xl font-extrabold', sub: 'text-[10px]' },
    lg: { icon: 56, title: 'text-2xl font-black', sub: 'text-xs' },
    xl: { icon: 76, title: 'text-3xl font-black', sub: 'text-sm' },
  };

  const dim = sizeMap[size];
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 4 Pillars rising vector emblem */}
      <div className="relative flex-shrink-0">
        <svg
          width={dim.icon}
          height={dim.icon}
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          <defs>
            <linearGradient id="p4G1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="p4G2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>
            <linearGradient id="p4G3" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
            <linearGradient id="p4G4" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="p4Sun" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Shield Badge Container */}
          <rect
            x="6"
            y="6"
            width="148"
            height="148"
            rx="32"
            fill={isDark ? '#0F172A' : '#0A2540'}
            stroke="#1E3A8A"
            strokeWidth="3"
          />

          {/* Subtle contour / wave grid */}
          <path
            d="M 24 50 C 45 36, 65 65, 90 50 C 115 35, 130 65, 136 55"
            stroke="#1E40AF"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            opacity="0.5"
          />
          <path
            d="M 24 80 C 50 72, 80 90, 105 75 C 125 65, 134 85, 136 80"
            stroke="#1E40AF"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            opacity="0.5"
          />

          {/* Golden Sun - Dawn of Poverty Exit */}
          <circle cx="80" cy="36" r="14" fill="url(#p4Sun)" />
          <path
            d="M 80 18 L 80 22 M 80 50 L 80 54 M 62 36 L 66 36 M 94 36 L 98 36"
            stroke="#FDE047"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* 4 Pillars representing People • Progress • Partnership • Poverty Exit */}
          {/* 1. People (Blue) */}
          <path d="M 36 122 L 36 92 L 52 82 L 52 122 Z" fill="url(#p4G1)" />
          {/* 2. Progress (Teal) */}
          <path d="M 56 122 L 56 74 L 72 64 L 72 122 Z" fill="url(#p4G2)" />
          {/* 3. Partnership (Saffron) */}
          <path d="M 76 122 L 76 56 L 92 46 L 92 122 Z" fill="url(#p4G3)" />
          {/* 4. Poverty Exit (Emerald Green) */}
          <path d="M 96 122 L 96 40 L 118 24 L 126 34 L 112 122 Z" fill="url(#p4G4)" />

          {/* Upward Pathway Arrowhead */}
          <path d="M 66 36 L 80 22 L 94 36 L 86 36 L 80 30 L 74 36 Z" fill="#FBBF24" />

          {/* Centroid Family Silhouette */}
          <g transform="translate(68, 86) scale(0.68)" fill="#FFFFFF">
            <circle cx="10" cy="9" r="4.5" />
            <path d="M 4 26 C 4 19, 8 16, 11 16 C 14 16, 17 19, 17 26 Z" />
            <circle cx="26" cy="7" r="5" />
            <path d="M 19 26 C 19 17, 23 14, 26 14 C 29 14, 34 17, 34 26 Z" />
            <circle cx="18" cy="18" r="3" />
            <path d="M 14 30 C 14 24, 16 23, 18 23 C 21 23, 23 24, 23 30 Z" />
          </g>
        </svg>

        {/* Small Golden Star */}
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center text-[8px] font-black text-slate-900 shadow ring-2 ring-white">
          ★
        </div>
      </div>

      {/* Brand Typography */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`tracking-tight ${dim.title} ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span className="text-amber-500">P</span>
              <span className="text-emerald-600">4</span>
            </span>
            <span
              className={`font-black tracking-wider uppercase px-2 py-0.5 rounded text-[11px] ${
                isDark
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}
            >
              ZERO POVERTY
            </span>
            {variant === 'full' && (
              <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                Civic-Tech Platform
              </span>
            )}
          </div>

          {showSubtitle && (
            <p
              className={`font-medium tracking-wide mt-1 ${dim.sub} ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <span className="text-sky-600 font-semibold">People</span> •{' '}
              <span className="text-teal-600 font-semibold">Progress</span> •{' '}
              <span className="text-orange-600 font-semibold">Partnership</span> •{' '}
              <span className="text-emerald-700 font-bold">Poverty Exit</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
