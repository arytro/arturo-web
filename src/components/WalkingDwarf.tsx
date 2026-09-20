import React from 'react';
import { motion } from 'motion/react';

interface WalkingDwarfProps {
  onComplete?: () => void;
}

export const WalkingDwarf: React.FC<WalkingDwarfProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ x: '-35%' }}
      animate={{ x: '135%' }}
      transition={{
        duration: 4.8,
        ease: 'linear',
      }}
      onAnimationComplete={onComplete}
      className="absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none select-none"
    >
      {/* Animated Walking Dwarf SVG & Elements */}
      <motion.div
        animate={{
          y: [0, -4, 0, -4, 0],
          rotate: [-2, 2, -2, 2, -2],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.6,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
      >
        <svg
          width="48"
          height="54"
          viewBox="0 0 64 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Walking Staff / Lantern */}
          <line x1="52" y1="20" x2="52" y2="68" stroke="#8B5A2B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="52" cy="18" r="5" fill="#FCD34D" opacity="0.9" />
          <circle cx="52" cy="18" r="9" fill="#FDE68A" opacity="0.3" className="animate-pulse" />

          {/* Pointed Dwarf Hat */}
          <path
            d="M20 30L32 6C33 4 35 4 36 6L48 30C48 30 35 34 20 30Z"
            fill="#EF4444"
          />
          {/* Hat rim */}
          <path
            d="M18 30C18 30 34 35 50 30C52 30 52 33 50 34C34 38 18 34 18 30Z"
            fill="#DC2626"
          />

          {/* Dwarf Head / Face */}
          <circle cx="34" cy="33" r="8" fill="#FBCFE8" />
          {/* Big Gnome Nose */}
          <ellipse cx="37" cy="34" rx="4.5" ry="3.5" fill="#F472B6" />
          {/* Eyes */}
          <circle cx="33" cy="31" r="1.5" fill="#1F2937" />
          <circle cx="39" cy="31" r="1.5" fill="#1F2937" />

          {/* Long Bushy White/Silver Beard */}
          <path
            d="M23 35C23 48 29 55 35 55C41 55 46 48 46 35C44 41 39 42 35 42C31 42 26 41 23 35Z"
            fill="#E5E7EB"
          />
          <path
            d="M28 37C28 47 32 52 35 52C38 52 42 47 42 37C40 41 37 42 35 42C33 42 30 41 28 37Z"
            fill="#F3F4F6"
          />

          {/* Tunic / Body */}
          <path
            d="M24 45C24 45 28 43 35 43C42 43 45 45 45 45L47 58H22L24 45Z"
            fill="#15803D"
          />

          {/* Belt with buckle */}
          <rect x="23" y="53" width="23" height="4" fill="#374151" />
          <rect x="32" y="52" width="6" height="6" rx="1" fill="#FBBF24" />

          {/* Left Boot */}
          <motion.path
            animate={{
              x: [-2, 3, -2],
              y: [0, -3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              ease: 'easeInOut',
            }}
            d="M24 58L22 65C22 66 23 67 25 67H30L30 58H24Z"
            fill="#78350F"
          />

          {/* Right Boot */}
          <motion.path
            animate={{
              x: [3, -2, 3],
              y: [-3, 0, -3],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              ease: 'easeInOut',
            }}
            d="M37 58L37 67H42C44 67 45 66 45 65L43 58H37Z"
            fill="#92400E"
          />
        </svg>
      </motion.div>

      {/* Tiny caption under dwarf */}
      <span className="text-[10px] font-mono tracking-tight text-amber-300/90 whitespace-nowrap mt-1 bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/30 backdrop-blur-sm">
        1% enano ✨
      </span>
    </motion.div>
  );
};
